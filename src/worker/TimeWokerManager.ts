let instace: TimerWorkerManager | null = null

export class TimerWorkerManager {
    private worker: Worker;

    private constructor() {
        this.worker = new Worker(new URL('./timeWorker.js', import.meta.url));
    }

    static getInstance() {
        if (!instace) {
            instace = new TimerWorkerManager();
        }
        return instace
    }

    postMessage(message: any) {
        this.worker.postMessage(message);
    }

    onmessage(cb: (e: MessageEvent) => void) {
        this.worker.onmessage = cb;
    }

    terminate() {
        this.worker.terminate();
        instace = null;
    }
}