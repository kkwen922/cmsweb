import request from '@/utils/request'

export function fetchSaleProdCount() {

  console.info("fetchList()->/sales/getSaleProdCount");

  return request({
    url: '/sales/getSaleProdCount',
    method: 'get'
  })
}

export function fetchTimeAmount() {

  console.info("fetchList()->/sales/getSalesAmount");

  return request({
    url: '/sales/getSalesAmount',
    method: 'get'
  })
}

export function fetchTimeCount() {

  console.info("fetchList()->/sales/getSalesCount");

  return request({
    url: '/sales/getSalesCount',
    method: 'get'
  })
}


export function fetchHotMachineCount() {

  console.info("fetchList()->/sales/getHotMachineCount");

  return request({
    url: '/sales/getHotMachineCount',
    method: 'get'
  })
}


