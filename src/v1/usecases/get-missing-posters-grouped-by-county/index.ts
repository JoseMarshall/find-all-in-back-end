import {
  Address,
  ApiErrorsName,
  ApiErrorsType,
  MissingPoster,
  MissingPosterStatus,
} from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import { MakeGetGroupedEntityDependencies } from '../../../main/external/repositories/mongodb/mongoose.types';
import uow from '../../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../../olyn/custom-error';
import { GroupedBy } from '../../entities/entity.types';

interface DataGroupedByCounty {
  status: `${MissingPosterStatus}`;
  county: string;
}

export interface DataGroupedByCountyAccumulator {
  county: string;
  [MissingPosterStatus.Found]: number;
  [MissingPosterStatus.Missing]: number;
  [MissingPosterStatus.Seen]: number;
}

function formatDataGroupedByCounty(data: readonly GroupedBy<DataGroupedByCounty>[]) {
  return data.reduce((acc: DataGroupedByCountyAccumulator[], cur) => {
    const index = acc.findIndex(({ county }) => county === cur.name.county);
    if (index !== -1) {
      acc[index] = {
        ...acc[index],
        [cur.name.status]: acc[index][cur.name.status] + cur.total,
      };
      return acc;
    }

    return acc.concat({
      county: cur.name.county,
      [MissingPosterStatus.Found]: 0,
      [MissingPosterStatus.Missing]: 0,
      [MissingPosterStatus.Seen]: 0,
      [cur.name.status]: cur.total,
    });
  }, []);
}

// eslint-disable-next-line import/prefer-default-export
export function getMissingPostersGroupedByCountyUC() {
  return async () => {
    const unitOfWork = await uow();
    try {
      const missingPosterRepo = unitOfWork.makeMissingPosterRepository();

      const missingPosterGrouped = await missingPosterRepo.getGroupedData<
        MakeGetGroupedEntityDependencies<DataGroupedByCountyAccumulator>
      >(
        { sortBy: `{"name.county":1}` },
        {
          groupBy: {
            id: {
              [MissingPoster.Status]: `$${MissingPoster.Status}`,
              [Address.County]: `$${MissingPoster.Address}.${Address.County}`,
            },
            total: {
              $sum: 1,
            },
          },
          formatData: formatDataGroupedByCounty,
        }
      );

      return {
        payload: missingPosterGrouped,
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 404,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: apiMessages['E-1008'],
            i18nCode: 'E-1008',
            stack: error.stack,
            details: error,
          });
    }
  };
}
