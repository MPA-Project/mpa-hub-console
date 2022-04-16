import { AbstractControl, ValidationErrors } from "@angular/forms";

export const httpQueryParamsBuilder = (params: any) => Object.keys(params)
  .map(key => `${key}=${params[key]}`)
  .join('&');
  
export const queryParamBuilder = (params: any[]) => params.join(',');

export const humanFileSize = (bytes: number, si = true, dp = 1): string => {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si ?
    ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] :
    ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
};

export const validateImage = (image: File): boolean => {
  // check the type
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (validTypes.indexOf(image.type) === -1) {
    return false;
  }

  // check the size
  const maxSizeInBytes = 5e6; // 5MB
  if (image.size > maxSizeInBytes) {
    return false;
  }
  return true;
};

// export const matchValues = (matchTo: string): (AbstractControl) => ValidationErrors | null =>
//   (control: AbstractControl): ValidationErrors | null => !!control.parent &&
//   !!control.parent.value &&
//   control.value === control.parent.controls.[matchTo]?.value ?
//   null :
//   {
//     isMatching: true
//   };

export const capitalizeFirstLetter = (str: string): string => {
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};