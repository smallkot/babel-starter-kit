export default function getUsername(url) {
  const re = new RegExp('@?(https?:)?(\/\/)?(www.)?((vk|twitter|telegram|github)[^\/]*\/)?([a-zA-Z0-9\.]*)', 'i');
  const username = url.match(re)[6];
  return username;
}
