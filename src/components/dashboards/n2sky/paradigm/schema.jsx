export const SCHEMA = {
	"metadata": {
		"name": null,
		"description": null,
		"paradigm": "Backpropagation"
	},
	"creator": {
		"name": null,
		"contact": null
	},
	"executionEnvironment": {
		"isRunning": false,
		"isPublic": false,
		"hardware": null,
		"lastRun": null,
		"image": {
			"imageType": null,
			"details": null
		}
	},
	"problemDomain": {
		"propagationType": {
			"value": null,
			"possibleValues": ["feedforward"],
			"learningType": {
				"value": null,
				"possibleValues": ["definedconstructed", "trained", "supervised", "usupervised", "linear"]
			}
		},
		"applicationField": {
			"value": null,
			"possibleValues": ["AccFin", "HealthMed", "Marketing", "Retail", "Insur", "Telecom", "Operations", "EMS"]
		},
		"problemType": {
			"value": null,
			"possibleValues": ["Classifiers", "Approximators", "Memory", "Optimisation", "Clustering"]
		},
		"networkType": "Backpropagation"
	},
	"endpoints": [{
		"name": "train",
		"endpoint": null
	}, {
		"name": "test",
		"endpoint": null
	}],
	"structure": {
		"inputLayer": {
			"result": {
				"nodesId": []
			},
			"config": {
				"dimensions": {
					"min": 1,
					"max": 1
				},
				"size": {
					"min": 960,
					"max": 960
				}
			}
		},
		"hiddenLayer": {
			"result": {
				"dimensions": [{
					"id": null,
					"nodesId": []
				}]
			},
			"config": {
				"dimensions": {
					"min": 1,
					"max": 1
				},
				"size": {
					"min": 960,
					"max": 960
				}
			}
		},
		"outputLayer": {
			"result": {
				"nodesId": []
			},
			"config": {
				"dimensions": {
					"min": 1,
					"max": 1
				},
				"size": {
					"min": 960,
					"max": 960
				}
			}
		},
		"connections": {
			"fullyConnected": {
				"isConnected": null
			},
			"shortcuts": {
				"isConnected": null,
				"connections": [{
					"from": null,
					"to": null,
					"isFullConnected": null
				}]
			}
		}
	},
	"parameters": {
		"input": [
			{
				"parameter": "learningrate",
				"defaultValue": "0.01",
				"possibleValues": [
					"0.1",
					"0.2",
					"0.3",
					"0.4"
				]
			},
			{
				"parameter": "biasInput",
				"defaultValue": "1",
				"possibleValues": ["1","2","3"]
			},
			{
				"parameter": "biasHidden",
				"defaultValue": "1",
				"possibleValues": ["1","2","3"]
			},
			{
				"parameter": "momentum",
				"defaultValue": "0.9",
				"possibleValues": ["0.1","0.2","0.3","0.4","0.5","0.6","0.7","0.8","0.9"]
			},
			{
				"parameter": "activationFunction",
				"defaultValue": "sigmoid",
				"possibleValues": ["sigmoid", "relu", "softmax"]
			},
			{
				"parameter": "activationFunctionHidden",
				"defaultValue": "relu",
				"possibleValues": ["sigmoid", "relu"]
			},
			{
				"parameter": "threshold",
				"defaultValue": "0.000001",
				"possibleValues": ["0.00001","0.000001"]
			},
			{
				"parameter": "target_data",
				"defaultValue": "[0],[1],[1],[0]",
				"possibleValues": []
			},
			{
				"parameter": "epoche",
				"defaultValue": "100",
				"possibleValues": []
			}
		],
		"output": "[[0,0],[0,1],[1,0],[1,1]]"
	},
	"data": {
		"description": "[X] for each output",
		"tableDescription": "[X],[X]",
		"fileDescription": "TXT"
	}
};
