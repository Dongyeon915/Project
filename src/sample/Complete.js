export const response = {
  dayInfo: {
    date: "2023-03-09",
    todo: {
      result: {
        clear: 0,
        rest: 0,
      },
      list: [
        {
          taskId: 1,
          task: "씻기",
          complete: false,
          completeTime: undefined
        }
      ]
    },
    pomodoro: {
      result: {
        interval: 0
      },
      config: {
        minute: 15,
        rest: 5,
        count: 15 * 60
      },
      timer: {
        state: {
          isRest: true,
          isRunning: false,
          isPause: false,
        },
      }
    }
  }
}