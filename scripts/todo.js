// Inicializa um array de tarefas (não usado diretamente depois, pois usamos o localStorage)
let tasks = []

// ========================
// FUNÇÃO: Mostra progresso das tarefas (concluídas/total)
// ========================
const renderTasksProgressData = (tasks) => {
  let tasksProgress;

  // Tenta encontrar o elemento com id 'tasks-progress'
  const tasksProgressDom = document.getElementById('tasks-progress')

  // Se já existir, usamos ele
  if (tasksProgressDom) tasksProgress = tasksProgressDom;
  else {
    // Se não existir, criamos e colocamos dentro de 'todo-footer'
    const newTasksProgressDom = document.createElement('div')
    newTasksProgressDom.id = 'tasks-progress'
    document.getElementById('todo-footer').appendChild(newTasksProgressDom)
    tasksProgress = newTasksProgressDom
  }

  // Conta quantas tarefas estão marcadas como concluídas
  const doneTasks = tasks.filter(({ checked }) => checked).length

  // Conta total de tarefas
  const totalTasks = tasks.length

  // Atualiza o texto do elemento
  tasksProgress.textContent = `${doneTasks}/${totalTasks} concluídas`
}

// ========================
// FUNÇÕES: localStorage (salvar e carregar tarefas)
// ========================
const getTasksFromLocalStorage = () => {
  const localTasks = JSON.parse(window.localStorage.getItem('tasks'))
  return localTasks ? localTasks : []; // Retorna array vazio se não houver nada
}

const setTasksInLocalStorage = (tasks) => {
  window.localStorage.setItem('tasks', JSON.stringify(tasks)) // Salva como string JSON
}

// ========================
// FUNÇÃO: Remover uma tarefa específica
// ========================
const removeTask = (taskId) => {
  const tasks = getTasksFromLocalStorage(); // Busca tarefas salvas
  const updatedTasks = tasks.filter(({ id }) => parseInt(id) !== parseInt(taskId)); // Remove a com o id

  setTasksInLocalStorage(updatedTasks) // Salva a lista atualizada
  renderTasksProgressData(updatedTasks) // Atualiza o contador

  // Remove o item do DOM
  document.getElementById("todo-list").removeChild(document.getElementById(taskId));
}

// ========================
// FUNÇÃO: Remover todas as tarefas concluídas
// ========================
const removeDoneTasks = () => {
  const tasks = getTasksFromLocalStorage()

  // Coleta os IDs das tarefas concluídas
  const tasksToRemove = tasks
    .filter(({ checked }) => checked)
    .map(({ id }) => id)

  // Filtra a lista para manter apenas as não concluídas
  const updatedTasks = tasks.filter(({ checked }) => !checked);
  setTasksInLocalStorage(updatedTasks) // Salva no localStorage
  renderTasksProgressData(updatedTasks) // Atualiza progresso

  // Remove visualmente cada tarefa concluída
  tasksToRemove.forEach((taskId) => {
    document.getElementById("todo-list").removeChild(document.getElementById(taskId))
  })
}

// ========================
// FUNÇÃO: Cria o item visual da tarefa no DOM
// ========================
const createTaskListItem = (task, checkbox) => {
  const list = document.getElementById('todo-list');
  const toDo = document.createElement('li'); // Cria um item de lista

  // Cria botão de remover tarefa
  const removeTaskButton = document.createElement('button');
  removeTaskButton.textContent = 'x';
  removeTaskButton.ariaLabel = 'Remover Tarefa';
  removeTaskButton.onclick = () => removeTask(task.id); // Conecta ao evento de remover

  toDo.id = task.id; // Define o id para o elemento li
  toDo.appendChild(checkbox); // Adiciona o checkbox
  toDo.appendChild(removeTaskButton); // Adiciona o botão
  list.appendChild(toDo); // Adiciona na lista principal

  return toDo;
}

// ========================
// FUNÇÃO: Ação ao clicar no checkbox
// ========================
const onCheckboxClick = (event) => {
  const [id] = event.target.id.split('-') // Extrai o ID do checkbox
  const tasks = getTasksFromLocalStorage()

  // Atualiza o status da tarefa com o ID correspondente
  const updatedTasks = tasks.map((task) => {
    return parseInt(id) === parseInt(task.id)
      ? { ...task, checked: event.target.checked }
      : task
  })

  setTasksInLocalStorage(updatedTasks)
  renderTasksProgressData(updatedTasks)
}

// ========================
// FUNÇÃO: Cria o checkbox e label da tarefa
// ========================
const getCheckboxInput = ({ id, description, checked }) => {
  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const wrapper = document.createElement('div');
  const checkboxID = `${id}-checkbox` // Define ID único

  checkbox.type = "checkbox";
  checkbox.id = checkboxID;
  checkbox.checked = checked || false; // Define se já estava marcada
  checkbox.addEventListener('change', onCheckboxClick); // Conecta evento

  label.textContent = description;
  label.htmlFor = checkboxID; // Conecta o label ao checkbox

  wrapper.className = 'checkbox-label-container';
  wrapper.appendChild(checkbox);
  wrapper.appendChild(label);

  return wrapper;
}

// ========================
// FUNÇÃO: Gera novo ID único
// ========================
const getNewTaskId = () => {
  const tasks = getTasksFromLocalStorage()
  const lastID = tasks[tasks.length - 1]?.id
  return lastID ? lastID + 1 : 1 // Se não existir, começa do 1
}

// ========================
// FUNÇÃO: Pega dados do formulário
// ========================
const getNewTaskData = (event) => {
  const description = event.target.elements.description.value; // Lê o texto do input
  const id = getNewTaskId();
  return { description, id };
}

// ========================
// FUNÇÃO: Simula atraso (como se estivesse esperando servidor)
// ========================
const getCreatedTaskInfo = (event) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(getNewTaskData(event))
  }, 3000) // Espera 3 segundos antes de resolver a tarefa
})

// ========================
// FUNÇÃO: Criar nova tarefa
// ========================
const createTask = async (event) => {
  event.preventDefault(); // Impede recarregar a página
  document.getElementById('save-task').setAttribute('disabled', true) // Desativa botão

  const newTaskData = await getCreatedTaskInfo(event) // Espera 3s

  const checkbox = getCheckboxInput(newTaskData)
  createTaskListItem(newTaskData, checkbox) // Cria visual no DOM

  // Atualiza lista de tarefas no localStorage
  const tasks = getTasksFromLocalStorage();
  const updatedTasks = [
    ...tasks,
    { id: newTaskData.id, description: newTaskData.description, checked: false }
  ]
  setTasksInLocalStorage(updatedTasks)
  renderTasksProgressData(updatedTasks)

  // Limpa input e reativa botão
  document.getElementById('description').value = ''
  document.getElementById('save-task').removeAttribute('disabled')
}

// ========================
// FUNÇÃO: Ao carregar a página
// ========================
window.onload = function () {
  const form = document.getElementById('create-todo-form');
  form.addEventListener('submit', createTask) // Conecta evento ao formulário

  const tasks = getTasksFromLocalStorage();

  // Para cada tarefa salva, monta visual e exibe
  tasks.forEach((task) => {
    const checkbox = getCheckboxInput(task);
    createTaskListItem(task, checkbox)
  });

  renderTasksProgressData(tasks) // Mostra progresso
}
