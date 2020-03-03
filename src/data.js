const data = {
  services: {
    "service-a1": {
      id: "service-a1",
      content: "service a1: cong 2 so"
    },
    "service-a2": {
      id: "service-a2",
      content: "service a2: nhan 2 so"
    },
    "service-b1": {
      id: "service-b1",
      content: "service b1: nhan 2"
    },
    "service-b2": {
      id: "service-b2",
      content: "service b2: nhan 3"
    }
  },
  clusters: {
    "cluster-1": {
      id: "cluster-1",
      title: "All services",
      serviceIDs: ["service-a1", "service-a2", "service-b1", "service-b2"]
    },
    "cluster-2": {
      id: "cluster-2",
      title: "Run order",
      serviceIDs: []
    }
  },
  clusterOrder: ["cluster-1", "cluster-2"],
  number_1: "",
  number_2: "",
  thuc_api: ""
};

export default data;
