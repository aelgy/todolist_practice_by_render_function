var todos = [{
  title: "倒垃圾",
  category: "normal",
  isCompleted: false
},
{
  title: "繳電話費",
  category: "important",
  isCompleted: false
},
{
  title: "採買本週食材",
  category: "urgent",
  isCompleted: false
},
];

function render() {
  const root = document.querySelector('#root')
  const ul = document.createElement('ul');
  // 之前忘了加 root.textContent，所以按下刪除鍵後會重複跑內容
  root.textContent = '';
  root.append(ul)
  for (let index in todos) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const finish = document.createElement('span')
    const finishBtn = document.createElement('button')
    const deleteBtn = document.createElement('button');
    span.textContent = todos[index].title;
    li.append(span, finish, finishBtn, deleteBtn);
    ul.append(li);

    // 判斷已完成與未完成
    if (todos[index].isCompleted) {
      finishBtn.textContent = '標示為未完成'
      finish.textContent = '（已完成）';
    } else {
      finishBtn.textContent = '標示為已完成'
      finish.textContent = '';
    }
    // 已完成的按鈕切換
    finishBtn.onclick = () => {
      if (todos[index].isCompleted) {
        todos[index].isCompleted = false;
      } else {
        todos[index].isCompleted = true;
      }
      render();
    }

    deleteBtn.innerText = '刪除'
    // 刪除按鈕
    deleteBtn.onclick = () => {
      todos.splice(index, 1)
      render();
    }
    // 顏色判斷式
    if (todos[index].category == 'important') {
      span.style.color = 'orange';
    } else if (todos[index].category == 'urgent') {
      span.style.color = 'red';
    }

  }
}


function add() {
  const input = document.querySelector('input');
  const select = document.querySelector('select')
  let item = {
    title: input.value,
    category: select.value
  }
  if (input.value == '' || select.value == '') {
    alert('請輸入文字與程度分類')
    // return 用來終止已經失敗的函數
    return
  }
  todos.push(item)
  render();
  input.value = '';
}

render()

function exportData() {
  let str = ''
  for (const index in todos) {
    let n = parseInt(index) + 1
    if (todos[index].category == 'important') {
      str += (n + '. ' + '*' + todos[index].title + '* ')
    } else if (todos[index].category == 'urgent') {
      str += (n + '. ' + '**' + todos[index].title + '** ')
    } else {
      str += (n + '. ' + todos[index].title + ' ')
    }
  }
  if (str != '') {
    alert("今日待辦：" + str)
  } else {
    alert('今日無待辦事項')
  }

}
