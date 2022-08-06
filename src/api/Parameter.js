import request from '@/utils/request'

export  function getList(queryList){
  return request({
    url: '/api/ParameterFluctuations/list',
    method: 'post',
    params: queryList
  });
}

export  function getList2(queryList){
  return request({
    url: '/api/ParameterValue/pageList',
    method: 'post',
    params: queryList
  });
}

export  function ParameterExceptionCount(queryList){
  return request({
    url: '/api/ParameterException/list',
    method: 'post',
    params: queryList
  });
}