import {ICommentEvent, ICommitRecord, IContainerInput, IFeedbackGiven, IPushEvent} from "../src/Types";

export class TestData {
    static readonly pushEventA: IPushEvent = {
        "branch":      "master",
        "cloneURL":    "",
        "commitSHA":   "abe1b0918b872997de4c4d2baf4c263f8d4c6dc2",
        "commitURL":   "https://github.ugrad.cs.ubc.ca/CPSC310-2017W-T2/d0_team999/commit/abe1b0918b872997de4c4d2baf4c263f8d4c6dc2",
        "projectURL":  "https://github.ugrad.cs.ubc.ca/CPSC310-2017W-T2/d0_team999/",
        "org":         "CPSC310-2017W-T2",
        "postbackURL": "EMPTY",
        "repoId":      "d0_team999",
        "timestamp":   1516472872288
    };

    static readonly pushEventB: IPushEvent = {
        "branch":      "master",
        "cloneURL":    "",
        "commitSHA":   "eventb0918b872997de4c4d2baf4c263f8d4c6dc2",
        "commitURL":   "https://github.ugrad.cs.ubc.ca/CPSC310-2017W-T2/d0_team999/commit/eventb0918b872997de4c4d2baf4c263f8d4c6dc2",
        "projectURL":  "https://github.ugrad.cs.ubc.ca/CPSC310-2017W-T2/d0_team999/",
        "org":         "CPSC310-2017W-T2",
        "postbackURL": "EMPTY",
        "repoId":      "d0_team999",
        "timestamp":   1516992872288
    };

    static readonly pushEventPostback: IPushEvent = {
        "branch":      "master",
        "cloneURL":    "",
        "commitSHA":   "abe1b0918b872997de4c4d2baf4c263f8d4c6dc2",
        "commitURL":   "https://github.ugrad.cs.ubc.ca/CPSC310-2017W-T2/d0_team999/commit/abe1b0918b872997de4c4d2baf4c263f8d4c6dc2",
        "projectURL":  "https://github.ugrad.cs.ubc.ca/CPSC310-2017W-T2/d0_team999/",
        "org":         "CPSC310-2017W-T2",
        "postbackURL": "POSTBACK",
        "repoId":      "d0_team999",
        "timestamp":   1516472872288
    };

    static readonly inputRecordA: IContainerInput = {
        "org":      "310",
        "delivId":  "d0",
        "pushInfo": TestData.pushEventA
    };

    static readonly inputRecordB: IContainerInput = {
        "org":      "310",
        "delivId":  "d0",
        "pushInfo": TestData.pushEventB
    };

    static readonly commentRecordUserA: ICommentEvent = {
        "botMentioned": true,
        "commitSHA":    "abe1b0918b872997de4c4d2baf4c263f8d4c6dc2",
        "commitURL":    "https://github.ugrad.cs.ubc.ca/CPSC310-2017W-T2/d0_team999/commit/abe1b0918b872997de4c4d2baf4c263f8d4c6dc2",
        "personId":     "cs310test",
        "org":          "310",
        "delivId":      "d1",
        "postbackURL":  "EMPTY",
        "timestamp":    1516472873288
    };

    static readonly commentRecordUserATooSoon: ICommentEvent = {
        "botMentioned": true,
        "commitSHA":    "abe1b0918b872997de4c4d2baf4c263f8d4c6dc2",
        "commitURL":    "https://github.ugrad.cs.ubc.ca/CPSC310-2017W-T2/d0_team999/commit/abe1b0918b872997de4c4d2baf4c263f8d4c6dc2",
        "personId":     "cs310test",
        "org":          "310",
        "delivId":      "d1",
        "postbackURL":  "EMPTY",
        "timestamp":    1516523258762
    };

    static readonly commentRecordStaffA: ICommentEvent = {
        botMentioned: true,
        commitSHA:    "abe1b0918b872997de4c4d2baf4c263f8d4staff",
        commitURL:    "https://github.ugrad.cs.ubc.ca/CPSC310-2017W-T2/d0_team999/commit/abe1b0918b872997de4c4d2baf4c263f8d4staff",
        personId:     "staff",
        org:          "310",
        delivId:      "d1",
        postbackURL:  "EMPTY",
        timestamp:    1516472874288
    };

    static readonly feedbackRecordA: IFeedbackGiven = {
        personId:  TestData.commentRecordStaffA.personId,
        org:       TestData.commentRecordStaffA.org,
        delivId:   TestData.commentRecordStaffA.delivId,
        timestamp: TestData.commentRecordStaffA.timestamp + 1000,
        commitURL: TestData.commentRecordStaffA.commitURL
    };

    static readonly feedbackRecordB: IFeedbackGiven = {
        personId:  TestData.commentRecordUserA.personId,
        org:       TestData.commentRecordUserA.org,
        delivId:   TestData.commentRecordUserA.delivId,
        timestamp: TestData.commentRecordUserA.timestamp + 1000,
        commitURL: TestData.commentRecordUserA.commitURL
    };

    static readonly outputRecordA: ICommitRecord = {
        "commitURL": "https://github.ugrad.cs.ubc.ca/CPSC310-2017W-T2/d0_team999/commit/abe1b0918b872997de4c4d2baf4c263f8d4c6dc2",
        "commitSHA": "abe1b0918b872997de4c4d2baf4c263f8d4c6dc2",
        "input":     TestData.inputRecordA,
        "output":    {
            "commitURL":          "https://github.ugrad.cs.ubc.ca/CPSC310-2017W-T2/d0_team999/commit/abe1b0918b872997de4c4d2baf4c263f8d4c6dc2",
            "timestamp":          1516523418918,
            "report":             {
                "scoreOverall": 50,
                "scoreTest":    50,
                "scoreCover":   50,
                "passNames":    [],
                "failNames":    [],
                "errorNames":   [],
                "skipNames":    [],
                "custom":       [],
                "feedback":     ""
            },
            "feedback":           "Test Feedback",
            "postbackOnComplete": false,
            "custom":             {},
            "attachments":        [],
            "state":              "SUCCESS"
        }
    };

    static readonly outputRecordB: ICommitRecord = {
        "commitURL": "https://github.ugrad.cs.ubc.ca/CPSC310-2017W-T2/d0_team999/commit/abe1b0918b872997de4c4d2baf4c263f8d4staff",
        "commitSHA": "abe1b0918b872997de4c4d2baf4c263f8d4staff",
        "input":     TestData.inputRecordA,
        "output":    {
            "commitURL":          "https://github.ugrad.cs.ubc.ca/CPSC310-2017W-T2/d0_team999/commit/abe1b0918b872997de4c4d2baf4c263f8d4staff",
            "timestamp":          1516523418918,
            "report":             {
                "scoreOverall": 50,
                "scoreTest":    50,
                "scoreCover":   50,
                "passNames":    [],
                "failNames":    [],
                "errorNames":   [],
                "skipNames":    [],
                "custom":       [],
                "feedback":     ""
            },
            "feedback":           "Test Feedback",
            "postbackOnComplete": false,
            "custom":             {},
            "attachments":        [],
            "state":              "SUCCESS"
        }
    };
}