import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentStatusesController } from './treatment_statuses.controller';

describe('TreatmentStatusesController', () => {
  let controller: TreatmentStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreatmentStatusesController],
    }).compile();

    controller = module.get<TreatmentStatusesController>(TreatmentStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
