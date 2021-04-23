import * as React from "react";
import firebase from "firebase/app";
import "firebase/database";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode
} from "@react-firebase/database";
import { firebaseConfig } from "../config";

const styles = {
  fontFamily: "sans-serif"
};

const s = (a) => JSON.stringify(a, null, 2);

class App extends React.Component {
  state = {
    limit: 2
  };
  render() {
    return (
      <div style={styles}>
        <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
          <FirebaseDatabaseNode
            path="user_bookmarks/"
            limitToFirst={this.state.limit}
            orderByKey
            // orderByValue={"created_on"}
          >
            {d => {
              return (
                <React.Fragment>
                  <pre>Path {d.path}</pre>
                  <pre style={{ height: 300, overflow: "auto" }}>
                    Value {s(d.value)}
                  </pre>
                  <button
                    onClick={() => {
                      this.setState(state => ({ limit: state.limit + 2 }));
                    }}
                  >
                    Load more
                  </button>
                </React.Fragment>
              );
            }}
          </FirebaseDatabaseNode>
        </FirebaseDatabaseProvider>
      </div>
    );
  }
}

export default App;
