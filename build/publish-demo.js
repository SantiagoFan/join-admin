#!/usr/bin/env node
const execSync = require('child_process').execSync

const ghpages = require('gh-pages')
execSync('npm run build:prod')
console.info('文件准备完成')
ghpages.publish('dist', function(err){
  console.info('demo发布完成')
});