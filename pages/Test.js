import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
const ADD_TODO = gql`
  mutation MyMutation {
    __typename
    sendEmail(
      input: {
        body: "aaaaa"
        from: "db@youngmedia.pl"
        subject: "AAAAA"
        to: "greedo904@gmail.com"
      }
    ) {
      message
      origin
    }
  }
`;

export default function AddTodo() {
  let input;
  const [addTodo, { data }] = useMutation(ADD_TODO);
  useEffect(() => {
    addTodo("dupa");
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = "";
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
