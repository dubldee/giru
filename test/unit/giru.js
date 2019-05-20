/* eslint-env mocha */

const { fork } = require('child_process')
const assert = require('assert')
const path = require('path')
const request = require('supertest')

describe('giru.js tests', () => {
  it('should print to console a regular log message on request', (done) => {
    const appDir = path.join(__dirname, '../')
    const testApp = fork(path.join(appDir, 'app.js'), { 'stdio': ['pipe', 'pipe', 'pipe', 'ipc'] })

    testApp.stdout.on('data', (data) => {
      if (data.includes('http GET "/" 200')) {
        testApp.send('stop')
      }
    })
    testApp.on('message', () => {
      request('http://localhost:3000')
        .get('/')
        .expect(200)
        .end((err, res) => {
          if (err) {
            assert.fail(err)
            testApp.send('stop')
          }
        })
    })
    testApp.on('exit', () => {
      done()
    })
  })

  it('should print to console a bad log message on request', (done) => {
    const appDir = path.join(__dirname, '../')
    const testApp = fork(path.join(appDir, 'app.js'), { 'stdio': ['pipe', 'pipe', 'pipe', 'ipc'] })

    testApp.stdout.on('data', (data) => {
      if (data.includes('http GET "/404" 404')) {
        testApp.send('stop')
      }
    })
    testApp.on('message', () => {
      request('http://localhost:3000')
        .get('/404')
        .expect(404)
        .end((err, res) => {
          if (err) {
            assert.fail(err)
            testApp.send('stop')
          }
        })
    })
    testApp.on('exit', () => {
      done()
    })
  })
})
