// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const context = 'http://ec2-35-182-210-106.ca-central-1.compute.amazonaws.com:10000';
const bam = 'http://localhost:9001/api/v2';
export const environment = {
  production: false,

  gambitContext: 'http://localhost:8765',

  context: context,
  bam: bam,
  url: 'http://localhost:80/',

  assessment: {
    fetchByBatchIdByWeek: (batchId: number, week: number) => `${context}trainer/assessment/${batchId}/${week}`,
    save: () => `${context}trainer/assessment/create`,
    update: () => `${context}trainer/assessment/update`,
    delete: (assessmentId: number) => `${context}trainer/assessment/delete/${assessmentId}`,
  },

  batch: {
    fetchAllByTrainer: () => `${context}/batches/trainers`,
    fetchAllByTrainerId: (id: number) => `${context}/batches/trainers/${id}`,
    fetchAll: () => `${context}/batches`,
    save: () => `${context}/batches`,
    update: () => `${context}/batches`,
    delete: (batchId) => `${context}/batches/${batchId}`
  },

  skillType: {
    find: (id) => `${context}/skills-service/skillType/${id}`,
    findByName: (name) => `${context}/gambit-skills-service/skillType/name/${name}`,
    findAll: () => `${context}/gambit-skills-service/skillType`,
    save: () => `${context}/gambit-skills-service/skillType`,
    update: (id) => `${context}/gambit-skills-service/skillType/${id}`,
    updateByName: (name) => `${context}/gambit-skills-service/skillType/name/${name}`,
    delete: (id) => `${context}/gambit-skills-service/skillType/${id}`,
    deleteByName: (name) => `${context}/gambit-skills-service/skillType/name/${name}`
  },

  category: {
    fetchAll: () => `${context}vp/category`,
    fetchAllActive: () => `${context}category/all`,
    fetchById: (id: number) => `${context}category/${id}`,
    save: () => `${context}vp/category`,
    update: () => `${context}vp/category/update`,
  },

  location: {
    fetchAll: () => `${context}all/location/all`,
    save: () => `${context}vp/location/create`,
    update: () => `${context}vp/location/update`,
  },

  note: {
    fetchQcBatchNotesByBatchIdByWeek: (batchId: number, week: number) => `${context}qc/note/batch/${batchId}/${week}`,
    fetchQcTraineeNotesByBatchIdByWeek: (batchId: number, week: number) => `${context}qc/note/trainee/${batchId}/${week}`,
    fetchBatchNotesByBatchIdByWeek: (batchId: number, week: number) => `${context}trainer/note/batch/${batchId}/${week}`,
    fetchTraineeNotesByBatchIdByWeek: (batchId: number, week: number) => `${context}trainer/note/trainee/${batchId}/${week}`,
    fetchTrainingNotesByTrainee: (traineeId: number) => `${context}all/notes/trainee/${traineeId}`,
    fetchQcNotesByTrainee: (traineeId: number) => `${context}qc/note/trainee/${traineeId}`,
    update: () => `${context}note/update`,
    save: () => `${context}note/create`,
    getAllQCTraineeNotes: (batchId: number, week: number) => `${context}qc/note/trainee/${batchId}/${week}`,
    findQCBatchNotes: (batchId: number, week: number) => `${context}qc/note/batch/${batchId}/${week}`,
  },

  panel: {
    fetchAll: () => `${context}panel/all`,
    fetchAllByTrainee: (traineeId) => `${context}panel/trainee/${traineeId}`,
    save: () => `${context}panel/create`,
    update: () => `${context}panel/update`,
    delete: (panelId: number) => `${context}panel/delete/${panelId}`,
  },

  grade: {
    fetchByBatchIdByWeek: (batchId, week) => `${context}all/grades/batch/${batchId}/week/${week}`,
    save: () => `${context}trainer/grade/create`,
    update: () => `${context}trainer/grade/update`,
  },

  qcStatus: {
    fetchAll: () => `${context}types/qcstatus/all`,
  },

  skill: {
    findAll: () => `${context}/gambit-skills-service/skill`,
    findByName: (name) => `${context}/gambit-skills-service/skill/name/${name}`,
    findById: (id) => `${context}/gambit-skills-service/skill/${id}`,
    findAllActive: () => `${context}/gambit-skills-service/skill`,
    save: () => `${context}/gambit-skills-service/skill`,
    updateByName: (name) => `${context}/gambit-skills-service/skill/name/${name}`,
    updateById: (id) => `${context}/gambit-skills-service/skill/${id}`,
    delete: (id) => `${context}/gambit-skills-service/skill/${id}`
  },

  skillType: {
    find: (id) => `${context}/gmabit-skills-service/skillType/${id}`,
    findByName: (name) => `${context}/gambit-skills-service/skillType/name/${name}`,
    findAll: () => `${context}/gambit-skills-service/skillType`,
    save: () => `${context}/gambit-skills-service/skillType`,
    update: (id) => `${context}/gambit-skills-service/skillType/${id}`,
    updateByName: (name) => `${context}/gambit-skills-service/skillType/name/${name}`,
    delete: (id) => `${context}/gambit-skills-service/skillType/${id}`,
    deleteByName: (name) => `${context}/gambit-skills-service/skillType/name/${name}`
  },

  trainee: {
    fetchAllByBatch: (batchId: number) => `${context}all/trainee?batchId=${batchId}`,
    save: () => `${context}all/trainee/create`,
    update: () => `${context}all/trainee/update`,
    delete: (traineeId: number) => `${context}all/trainee/delete/${traineeId}`,
    fetchDroppedByBatch: (batchId: number) => `${context}all/trainee/`,
  },

  trainer: {
    fetchByEmail: (email: string) => `${context}training/trainer/byemail/${email}`,
    fetchAll: () => `${context}all/trainer/all`,
    save: () => `${context}vp/trainer/create`,
    update: () => `${context}vp/trainer/update`,
    getTitles: () => `${context}vp/trainer/titles`,
    getTiers: () => `${context}types/trainer/role/all`,
  },

  trainingType: {
    fetchAll: () => `${context}types/training/all`,
  },

  traineeStatus: {
    fetchAll: () => `${context}types/trainingstatus/all`,
  },

  // API calls for the VP functionality group
  getAllCategories: context + 'vp/category',
  addNewCategory: context + 'vp/category',
  editCurrentCategory: context + 'vp/category/update',

  // Location API calls
  getAllLocations: context + 'all/location/all',
  editLocation: context + 'vp/location/update',
  deleteLocation: context + 'vp/location/update',
  reactivateLocation: context + 'vp/location/reactivate',
  addLocation: context + 'vp/location/create',

  // Trainer API calls
  getAllTitles: context + 'vp/trainer/titles',
  getAllTiers: context + 'types/trainer/role/all',
  getAllTrainers: context + 'all/trainer/all',
  addNewTrainer: context + 'vp/trainer/create',
  deleteTrainer: context + 'vp/trainer/update',
  editTrainer: context + 'vp/trainer/update',

  // Reports Service API endpoints
  reportsStackedBarCurrentWeek: context + 'all/reports/batch/week/stacked-bar-current-week',
  reportsDashBoard: context + 'all/reports/dashboard',
  reportsBiWeeklyPanel: context + 'all/reports/biweeklyPanelResults',

  /* Reporting service API endpoints */
  apiBatchComparisonAvgEndpoint: (skill: string, training: string, startDate) =>
    environment.context + `/all/reports/compare/skill/${skill}/training/${training}/date/${startDate}`,

  apifetchBatchWeekPieChart: (batchId: Number, weekId: Number) =>
    environment.context + `all/reports/batch/${batchId}/week/${weekId}/pie`,

  apiPieChartCurrentWeekQCStatus: (batchId: Number) =>
    environment.context + `all/reports/batch/${batchId}/pie`,

  apiAllBatchesCurrentWeekQCStackedBarChart: (batchId: Number, week: Number) =>
    environment.context + `all/reports/batch/${batchId}/week/${week}/bar-batch-week-avg`,

  apiBatchWeekAvgBarChart: (batchId: Number, week: Number) =>
    environment.context + `all/reports/batch/${batchId}/week/${week}/bar-batch-week-avg`,

  apiBatchWeekSortedBarChart: (batchId: Number, week: Number) =>
    environment.context + `all/reports/batch/${batchId}/week/${week}/bar-batch-weekly-sorted`,

  apiBatchOverallTraineeBarChart: (batchId: Number, traineeId: Number) =>
    environment.context + `all/reports/batch/${batchId}/overall/trainee/${traineeId}/bar-batch-overall-trainee`,

  apiBatchOverallBarChart: (batchId: Number) =>
    environment.context + `all/reports/batch/${batchId}/overall/bar-batch-overall`,

  apiBatchWeekTraineeBarChart: (batchId: Number, weekId: Number, traineeId: Number) =>
    environment.context + `all/reports/batch/${batchId}/week/${weekId}/trainee/${traineeId}/bar-batch-week-trainee`,

  apiTraineeUpToWeekLineChart: (batchId: Number, weekId: Number, traineeId: Number) =>
    environment.context + `all/reports/batch/${batchId}/week/${weekId}/trainee/${traineeId}/line-trainee-up-to-week`,

  apiTraineeOverallLineChart: (batchId: Number, traineeId: Number) =>
    environment.context + `all/reports/batch/${batchId}/overall/trainee/${traineeId}/line-trainee-overall`,

  apiBatchOverallLineChart: (batchId: Number) =>
    environment.context + `all/reports/batch/${batchId}/overall/line-batch-overall`,

  apiCurrentBatchesLineChart: this.context + 'all/reports/dashboard',
  apiCurrentPanelsLineChart: this.context + 'all/reports/biweeklyPanelResults',

  apiTraineeUpToWeekRadarChart: (week: Number, traineeId: Number) =>
    environment.context + `all/reports/week/${week}/trainee/${traineeId}/radar-trainee-up-to-week`,

  apiTraineeOverallRadarChart: (traineeId: Number) =>
    environment.context + `all/reports/trainee/${traineeId}/radar-trainee-overall`,

  apiBatchOverallRadarChart: (batchId: Number) =>
    environment.context + `all/reports/batch/${batchId}/overall/radar-batch-overall`,

  apiBatchAllTraineesRadarChart: (batchId: Number) =>
    environment.context + `all/reports/batch/${batchId}/radar-batch-all-trainees`,

  apiBatchWeekAverageValue: (batchId: Number, weekId: Number) =>
    environment.context + `all/assessments/average/${batchId}/${weekId}`,

  apiTechnologiesForTheWeek: (batchId: Number, weekId: Number) =>
    environment.context + `all/assessments/categories/batch/${batchId}/week/${weekId}`,

  apiPanelBatchAllTrainees: (batchId: Number) =>
    environment.context + `all/reports/batch/${batchId}/panel-batch-all-trainees`,

    /* Evaluation service API endpoints */
  apiFetchAllQCTraineeNotes: (batchId: Number, weekId: Number) =>
  environment.context + `qc/note/trainee/${batchId}/${weekId}`,

  apiFetchAllQCBatchNotes: (batchId: Number, weekId: Number) =>
  environment.context + `qc/note/batch/${batchId}/${weekId}`,

};
