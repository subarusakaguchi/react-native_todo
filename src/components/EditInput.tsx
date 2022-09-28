import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface EditInputProps {
    taskValue: string;
    taskId: number;
    updateTask: (newTitle: string, id: number) => void
}


export function EditInput({taskValue, taskId, updateTask}: EditInputProps) {
  const [task, setTask] = useState<string>('');
  const [tempId, setTempId] = useState<number>(0);

  function handleAddNewTask() {
    if (task !== '') {
        updateTask(task, tempId)
        setTask('')
        setTempId(0)
    }
  }

  useEffect(() => {
    setTask(taskValue)
    setTempId(taskId)
  },[])

  return (

      <TextInput 
        style={styles.input} 
        returnKeyType="send"
        selectionColor="#666666"
        value={task}
        onChangeText={setTask}
        onSubmitEditing={() => handleAddNewTask()}
      />

  )
}

const styles = StyleSheet.create({
  input: {
    width: 220,
    color: '#666',
    padding: 0,
  }
});