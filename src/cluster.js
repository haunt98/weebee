import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Service from "./service";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const ServiceList = styled.h3`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};
  flex-grow: 1;
  min-height: 100px;
`;

export default class Cluster extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.cluster.title}</Title>
        <Droppable droppableId={this.props.cluster.id}>
          {(provided, snapshot) => (
            <ServiceList
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.services.map((service, index) => (
                <Service key={service.id} service={service} index={index}></Service>
              ))}
              {provided.placeholder}
            </ServiceList>
          )}
        </Droppable>
      </Container>
    );
  }
}
