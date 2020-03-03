import React from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import data from "./data";
import Cluster from "./cluster";

const Container = styled.div`
  display: flex;
`;
const Form = styled.form`
  margin: 8px;
  display: flex;
  flex-direction: column;
`;
const Label = styled.label``;
const Input = styled.input`
  margin-top: 4px;
  margin-bottom: 4px;
`;

class App extends React.Component {
  state = data;

  onDragEnd = result => {
    const { draggableId, source, destination } = result;

    if (!destination) {
      return;
    }

    // move but not move
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // same phase
    if (destination.droppableId === source.droppableId) {
      const cluster = this.state.clusters[source.droppableId];
      const newServiceIDs = Array.from(cluster.serviceIDs);
      newServiceIDs.splice(source.index, 1);
      newServiceIDs.splice(destination.index, 0, draggableId);
      const newCluster = {
        ...cluster,
        serviceIDs: newServiceIDs
      };

      const newState = {
        ...this.state,
        clusters: {
          ...this.state.clusters,
          [newCluster.id]: newCluster
        }
      };

      this.setState(newState);
      return;
    }

    // different phase
    const sourceCluster = this.state.clusters[source.droppableId];
    const newSourceServiceIDs = Array.from(sourceCluster.serviceIDs);
    // remove source
    newSourceServiceIDs.splice(source.index, 1);
    const newSourceCluster = {
      ...sourceCluster,
      serviceIDs: newSourceServiceIDs
    };

    const destinationCluster = this.state.clusters[destination.droppableId];
    const newDestionationServiceIDs = Array.from(destinationCluster.serviceIDs);
    // add destination
    newDestionationServiceIDs.splice(destination.index, 0, draggableId);
    const newDestinationCluster = {
      ...destinationCluster,
      serviceIDs: newDestionationServiceIDs
    };

    const newState = {
      ...this.state,
      clusters: {
        ...this.state.clusters,
        [newSourceCluster.id]: newSourceCluster,
        [newDestinationCluster.id]: newDestinationCluster
      }
    };

    this.setState(newState);
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.number_1);
    console.log(this.state.number_2);
    console.log(this.state.clusters["cluster-2"]);
  };

  handleChangeNumber1 = event => {
    const newState = {
      ...this.state,
      number_1: event.target.value
    };

    this.setState(newState);
  };

  handleChangeNumber2 = event => {
    const newState = {
      ...this.state,
      number_2: event.target.value
    };

    this.setState(newState);
  };

  render() {
    return (
      <Container>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.clusterOrder.map(clusterID => {
            const cluster = this.state.clusters[clusterID];
            const services = cluster.serviceIDs.map(
              serviceID => this.state.services[serviceID]
            );

            return (
              <Cluster
                key={cluster.id}
                cluster={cluster}
                services={services}
              ></Cluster>
            );
          })}
        </DragDropContext>
        <Form onSubmit={this.handleSubmit}>
          <Label>Number 1:</Label>
          <Input
            type="text"
            value={this.state.number_1}
            onChange={this.handleChangeNumber1}
          ></Input>
          <Label>Number 2:</Label>
          <Input
            type="text"
            value={this.state.number_2}
            onChange={this.handleChangeNumber2}
          ></Input>
          <Input type="submit" value="Submit"></Input>
        </Form>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
