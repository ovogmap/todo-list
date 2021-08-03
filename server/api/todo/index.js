const express = require('express')
const router = express.Router()

let todos = require('../../../db/data')

let id = todos.length

router.get('/', (req, res) => {
  res.status(200).json({
    datas: todos,
    message: '',
  })
})

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)

  if (Number.isNaN(id)) {
    res.status(400).json({
      data: undefined,
      message: '잘못 된 요청입니다.',
    })
  }

  const findTodoItem = todos.find((todo) => todo.id === id)

  res.status(200).json({
    data: findTodoItem,
    message: '',
  })
})

router.post('/', (req, res) => {
  const content = req.body.todo
  console.log(content)
  if (typeof content !== 'string') {
    res.status(400).json({
      data: undefined,
      message: 'todo의 타입이 잘못 되었습니다.',
    })
  }

  const todo = {
    id,
    todo: content,
  }

  const newArr = [...todos, todo]
  todos = newArr

  res.status(200).json({
    datas: todos,
    message: '',
  })

  id++
})

router.post('/delete', (req, res) => {
  const id = parseInt(req.body.id, 10)

  if (Number.isNaN(id)) {
    res.status(400).json({
      data: undefined,
      message: 'id값을 확인해 주세요.',
    })
  }

  const newTodos = todos.filter((todo) => todo.id !== id)
  todos = newTodos

  res.status(200).json({
    datas: todos,
    message: '',
  })
})

router.post('/update/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const content = req.body.todo

  if (Number.isNaN(id)) {
    res.status(400).json({ data: undefined, message: 'id값을 확인해 주세요.' })
  }
  if (typeof content !== 'string') {
    res
      .status(400)
      .json({ data: undefined, message: 'todo의 타입을 확인해 주세요.' })
  }

  const idx = todos.findIndex((todo) => todo.id === id)

  let newTodos = [...todos]
  newTodos[idx].todo = content

  // const newTodos = todos.map((todo) => ({
  //   ...todo,
  //   todo: todo.id === id ? content : todo.todo,
  // }))

  todos = newTodos

  res.status(200).json({
    datas: todos,
    message: '',
  })
})

module.exports = router
