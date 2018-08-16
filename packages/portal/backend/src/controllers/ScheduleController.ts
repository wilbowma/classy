// import Scheduler from "node-schedule"
//
//
//

import {GitHubController} from "./GitHubController";
import {AssignmentController} from "./340/AssignmentController";
import Log from "../../../../common/Log";
import {DeliverablesController} from "./DeliverablesController";
import {DatabaseController} from "./DatabaseController";
import {Deliverable} from "../Types";

let schedule = require('node-schedule');

// This exists so we can potentially add more information to the task
export interface Task {
    scheduledTask: any,
    // time: string
}

// TAKE THE DELIVERABLE AND MAP IT TO THE ACTION
// ONLY ONE JOB PER ACTION PER DELIVERABLE

export class ScheduleController {

    private taskList: {[taskName: string]:Task};
    private static instance: ScheduleController = null;

    public static getInstance(): ScheduleController {
        if(ScheduleController.instance === null) {
            ScheduleController.instance = new ScheduleController();
        }
        return ScheduleController.instance;
    }

    private constructor() {
        this.taskList = {};
    }

    public async scheduleAssignmentCreation(scheduledTime: Date, assignId: string): Promise<boolean> {
        let taskName: string = "CREATE_" + assignId;

        if (typeof this.taskList[taskName] !== 'undefined') {
            delete this.taskList[taskName];
        }

        let scheduledJob = schedule.scheduleJob(scheduledTime, () => {
            let ac: AssignmentController = new AssignmentController();
            let ghc: GitHubController = new GitHubController();

            ac.initializeAllRepositories(assignId).then((result) => {
                // remove from taskList
                if (result) {
                Log.info("ScheduleController::scheduleAssignmentCreation - Finished initializing repositories for deliverable: " + assignId);
                } else {
                    Log.warn("ScheduleController::scheduleAssignmentCreation - An error occurred when initializing repositories for deliverable: " + assignId);
                }
                delete this.taskList[taskName];
            }).catch(function (err) {
                Log.error("ScheduleController::scheduleAssignmentCreation - Error: " + err);
            });
        });

        let newTask: Task = {
            scheduledTask: scheduledJob,
        };

        this.taskList[taskName] = newTask;
        return true;
    }

    // public async scheduleTask(scheduledTime: string, functionCall: () => Promise<void>) {
    //
    // }

    public async scheduleAssignmentPublish(scheduledTime: Date, assignId: string): Promise<boolean> {
        let taskName: string = "PUBLISH_" + assignId;

        if (typeof this.taskList[taskName] !== 'undefined') {
            delete this.taskList[taskName];
        }

        let scheduledJob = schedule.scheduleJob(scheduledTime, () => {
            let ac: AssignmentController = new AssignmentController();
            let ghc: GitHubController = new GitHubController();

            ac.publishAllRepositories(assignId).then((result) => {
                // remove from taskList
                if (result) {
                Log.info("ScheduleController::scheduleAssignmentPublish - Finished publishing repositories for deliverable: " + assignId);
                } else {
                    Log.warn("ScheduleController::scheduleAssignmentPublish - An error occurred when publishing repositories for deliverable: " + assignId);
                }
                delete this.taskList[taskName];
            }).catch(function (err) {
                Log.error("ScheduleController::scheduleAssignmentPublish - Error: " + err);
            });
        });

        let newTask: Task = {
            scheduledTask: scheduledJob,
        };

        this.taskList[taskName] = newTask;
        return true;
    }

    public async scheduleAssignmentClosure(scheduledTime: Date, assignId: string): Promise<boolean> {
        let taskName: string = "CLOSE_" + assignId;

        if (typeof this.taskList[taskName] !== 'undefined') {
            delete this.taskList[taskName];
        }

        let scheduledJob = schedule.scheduleJob(scheduledTime, () => {
            let ac: AssignmentController = new AssignmentController();
            let ghc: GitHubController = new GitHubController();

            ac.closeAllRepositories(assignId).then((result) => {
                // remove from taskList
                if (result) {
                Log.info("ScheduleController::scheduleAssignmentClosure - Finished closing repositories for deliverable: " + assignId);
                } else {
                    Log.warn("ScheduleController::scheduleAssignmentClosure - An error occurred when closing repositories for deliverable: " + assignId);
                }
                delete this.taskList[taskName];
            }).catch(function (err) {
                Log.error("ScheduleController::scheduleAssignmentClosure - Error: " + err);
            });
        });

        let newTask: Task = {
            scheduledTask: scheduledJob,
        };

        this.taskList[taskName] = newTask;
        return true;
    }


    public getTask(taskName: string): Task | null {
        Log.info("ScheduleController::getTask( " + taskName + " ) - start");
        if (typeof this.taskList[taskName] === 'undefined') {
            Log.error("ScheduleController::getTask(..) - error: " + taskName + " was not found");
            return null;
        }

        return this.taskList[taskName];
    }

    public deleteTask(taskName: string): boolean {
        Log.info("ScheduleController::deleteTask( " + taskName + " ) - start");
        if(typeof this.taskList[taskName] === 'undefined') {
            Log.error("ScheduleController::deleteTask(..) - error: " + taskName + " was not found");
            return false;
        }
        let task: Task = this.taskList[taskName];

        let job = task.scheduledTask;

        job.cancel();

        delete this.taskList[taskName];

        return true;
    }
}
