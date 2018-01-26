export const getRedirectPath = ({ type, avatar }) => {
  // 根据用户信息跳转地址
  // user.type /boss /genius
  // user.avatar /bossinfo /geniusinfo
  let url = (type === 'boss') ? '/boss' : '/genius'
  if (!avatar) url += 'info'
  return url
}
