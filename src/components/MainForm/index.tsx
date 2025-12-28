import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionsTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips";
import { TimerWorkerManager } from "../../worker/TimeWokerManager";

export function MainForm() {
    const { state, dispatch } = useTaskContext();
    const taskNameInput = useRef<HTMLInputElement>(null);

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);



    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!taskNameInput.current) return;

        const taskName = taskNameInput.current.value.trim();

        if (!taskName) {
            alert('Digite o nome da tarefa');
            return;
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType
        };

        dispatch({ type: TaskActionsTypes.START_TASK, payload: newTask });

        // const worker = TimerWorkerManager.getInstance();

        // worker.postMessage('AAAAAAAAA')

        // worker.onmessage((event) => {
        //     console.log('PRINCIPAL', event.data)
        // })

    }

    function handleInterruptTask(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        dispatch({ type: TaskActionsTypes.INTERRUPT_TASK });
    }

    return (
        <form onSubmit={handleCreateNewTask} className='form' action=''>
            <div className='formRow'>
                <DefaultInput
                    id='meuInput'
                    type='text'
                    label='task'
                    placeholder='Digite algo'
                    ref={taskNameInput}
                    disabled={!!state.activeTask}
                />
            </div>
            <div className='formRow'>
                <Tips />
            </div>
            {state.currentCycle > 0 && (
                <div className='formRow'>
                    <Cycles />
                </div>
            )}
            <div className='formRow'>
                {!state.activeTask ? (
                    <DefaultButton
                        aria-label="Iniciar nova tarefa"
                        title="Iniciar nova tarefa"
                        type='submit' icon={<PlayCircleIcon />}
                    />
                ) : (
                    <DefaultButton
                        aria-label="Interromper tarefa atual"
                        title="Interromper tarefa atual"
                        color="red"
                        type='button' onClick={handleInterruptTask} icon={<StopCircleIcon />} />
                )}
            </div>
        </form>
    )
}