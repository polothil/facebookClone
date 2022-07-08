export default function dataUriToBlob(dataURI) {
  // Convert base64/URLEncoded data component to raw binary data held in the string

  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  let ia = new Uint8Array(byteString.length);
  for (let index = 0; index < byteString.length; index++) {
    ia[index] = byteString.charCodeAt(index);
  }

  return new Blob([ia], { type: mimeString });
}
