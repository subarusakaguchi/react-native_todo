import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  let removeTaskVerify = false

  const taskAlreadyExistsAlert = () =>
    Alert.alert(
      "Task já cadastrada",
      "Você não pode adicionar uma task com o mesmo título",
      [
        { text: "OK" }
      ]
  );

  const removeTaskAlert = (id: number) =>
    Alert.alert(
      "Remover Item",
      "Tem certeza que deseja apagar esta task permanentemente?",
      [
        {
          text: "Cancel"
        },
        { text: "Apagar", onPress: () => {
            removeTaskVerify = true
            handleRemoveTask(id)
          }
        }
      ]
  );

  function handleAddTask(newTaskTitle: string) {
    const titleAlreadyExists = tasks.find(task => task.title === newTaskTitle);

    if (titleAlreadyExists) {
      taskAlreadyExistsAlert()
    } else {
      const newTask:Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
        isEditing: false
      }
  
      setTasks(oldTasks => [...oldTasks, newTask])
    }
  }

  function handleToggleTaskDone(id: number) {
    const taskIndex = tasks.findIndex(task => task.id === id)

    if (taskIndex || taskIndex === 0) {
      const updatedTasks = tasks.map(task => ({...task}))

      updatedTasks[taskIndex].done = !updatedTasks[taskIndex].done

      setTasks(updatedTasks)
    }
  }

  function handleRemoveTask(id: number) {
    if (removeTaskVerify) {
      setTasks(oldTasks => oldTasks.filter(task => task.id !== id))
      removeTaskVerify = false
    } else {
      removeTaskAlert(id)
    }
  }

  function handleEditTask(id: number) {
    const taskIndex = tasks.findIndex(task => task.id === id)

    if (taskIndex || taskIndex === 0) {
      const updatedTasks = tasks.map(task => ({...task}))

      updatedTasks[taskIndex].isEditing = !updatedTasks[taskIndex].isEditing

      setTasks(updatedTasks)
    }
  }

  function handleUpdateTask(newTitle: string, id: number) {
    const taskIndex = tasks.findIndex(task => task.id === id)

    if (taskIndex || taskIndex === 0) {
      const updatedTasks = tasks.map(task => ({...task}))

      updatedTasks[taskIndex].title = newTitle

      updatedTasks[taskIndex].isEditing = false

      setTasks(updatedTasks)
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
        updateTask={handleUpdateTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})