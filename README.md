# node-dd - [钉钉SDK](https://open-doc.dingtalk.com)

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/node-dd.svg?style=flat-square
[npm-url]: https://npmjs.org/package/node-dd
[travis-image]: https://img.shields.io/travis/taoqf/node-dingtalk.svg?style=flat-square
[travis-url]: https://travis-ci.org/taoqf/node-dingtalk
[codecov-image]: https://img.shields.io/codecov/c/github/taoqf/node-dingtalk.svg?style=flat-square
[codecov-url]: https://codecov.io/github/taoqf/node-dingtalk?branch=master
[david-image]: https://img.shields.io/david/taoqf/node-dingtalk.svg?style=flat-square
[david-url]: https://david-dm.org/taoqf/node-dingtalk
[snyk-image]: https://snyk.io/test/npm/node-dd/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/node-dd
[download-image]: https://img.shields.io/npm/dm/node-dd.svg?style=flat-square
[download-url]: https://npmjs.org/package/node-dd

## Install

```shell
$ npm i node-dd --save
# $ npm i node-dingtalk --save for version 0.2.x, 0.1.x
```

## Usage

```javascript
const DingTalk = require('node-dd').DingTalk;
const dingtalk = new DingTalk({
  corpid: '',
  corpsecret: ''
});

const deparment = await dingtalk.department.get('1');
console.log(deparment);
```
```typescript
import { DingTalk } from 'node-dd';
// or
import DingTalk from 'node-dd';
const dingtalk = new DingTalk({
  corpid: '',
  corpsecret: ''
});

const deparment = await dingtalk.department.get('1');
console.log(deparment);
```
## Api

官方文档: https://open-doc.dingtalk.com/

### Client

#### client.getAccessToken()
获取 AccessToken, 并在有效期内自动缓存, `gettoken`
#### client.get_sso_access_token(ssosecret)
获取 SsoToken, 并在有效期内自动缓存, `sso/gettoken`

#### client.getJSApiTicket()
获取 jsapi_ticket, 并在有效期内自动缓存, `get_jsapi_ticket`

#### client.getJSApiConfig()
获取 js api 接入时需要的配置数据以及签名

#### client.request/get/post/upload
辅助方法, 参见 `npm urllib`


### Department

https://open-doc.dingtalk.com/doc2/detail.htm?treeId=172&articleId=104979&docType=1

#### department.list([opts])

获取部门列表 `department/list`

#### department.get(id)

获取部门详情 `department/get`

#### department.create({ name, parentid, … })

创建部门 `department/create`

#### department.update({ id, … })

更新部门 `department/update`

#### department.delete(id)

 删除部门 `department/delete`



### User

https://open-doc.dingtalk.com/doc2/detail.htm?treeId=172&articleId=104979&docType=1

#### user.simplelist([departmentId], [opts])

- 获取部门成员 `user/simplelist`

分页查询参数放到 opts
#### user.list([departmentId], [opts])

- 获取部门成员(详情) `user/list`

分页查询参数放到 opts

#### user.simpleListAll([departmentId], [opts])

自动遍历分页查询
- 查询所有的成员 (departmentId 为空时)
- 查询该部门所有成员
#### user.listAll([departmentId], [opts])

自动遍历分页查询
- 查询所有的成员 (departmentId 为空时)
- 查询该部门所有成员

#### user.get(id, [opts])

获取成员详情 `user/get`

id 对应于 userid, 参数, 其他参数放到 opts

#### user.create({ userid, name, department[], mobile, … })

创建成员  `user/create`

#### user.update({ userid, name, … })

更新成员 `user/update`

#### user.delete(id/id[])

- 删除成员 `user/delete`
- 批量删除成员 `user/batchdelete`

#### user.getUseridByUnionid(openId)

根据 unionid 获取成员的 userid,  `user/getUseridByUnionid`

此处的 unionid 即为 user.openId

#### user.getByMobile(mobile)

根据手机号获取成员 userid,  `user/get_by_mobile`


### Message

#### message.send({ touser, toparty, msgtype, ... })
发送企业消息, `message/send`

### message.listMessageStatus(messageId)
获取企业会话消息已读未读状态, `message/list_message_status`


### Media

#### media.upload(type, filePath)
上传媒体文件 `media/upload`

#### media.get(id)
获取媒体文件的下载地址 `media/get`

#### media.download(id, targetDir, [fileName])
下载媒体文件 `media/get`

## Develop
1. clone this repo
```sh
$ git clone git@github.com:ali-sdk/node-dingtalk.git
$ cnpm install
```
2. Coding
3. Compile the typescript to javascript(you may want to change the target in tsconfig to 'es3')
```sh
# you may have gulp installed globally by `npm i -g gulp` or `yarn global add gulp`
$ gulp
```
4. Test your code
```sh
$ npm test
```

## Questions & Suggestions

Please open an issue [here](https://github.com/atian25/node-dingtalk/issues).

## License

[MIT](LICENSE)
