import SagaTester from 'redux-saga-tester';
import { rootSliceGroup } from '@vmw/slices-for-redux';
import { getQueuedSagas, QueuedSaga } from '@vmw/queue-for-redux-saga';
import { all, call } from 'redux-saga/effects';

export function createSagaTester(
  initialState: any = undefined
): SagaTester<any> {
  // @ts-ignore
  const sagaTester = new SagaTester({
    initialState,
    reducers: rootSliceGroup.reducer,
  });
  const queuedSagas: QueuedSaga[] = getQueuedSagas();
  // console.log('queuedSagas', queuedSagas.length);
  if (queuedSagas.length) {
    sagaTester.start(runQueuedSagas, queuedSagas);
  }
  return sagaTester;
}

function* runQueuedSagas(queuedSagas: QueuedSaga[]) {
  yield all(
    queuedSagas.map((qSaga: QueuedSaga) => call(qSaga.saga, ...qSaga.args))
  );
}
