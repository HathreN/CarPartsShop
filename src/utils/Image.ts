import {BaseRouter} from 'next/dist/shared/lib/router/router';

export function imageUrl(router: BaseRouter, url: string){
  return `${router.basePath}/assets/images/${url}`
}