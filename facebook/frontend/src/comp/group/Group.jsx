import React, { PureComponent } from "react";
import { Button } from "antd";
import Modal from "react-modal";
import "semantic-ui-css/semantic.min.css";
import { DebounceInput } from "react-debounce-input";
import withState from "../hoc/withState";
class Group extends PureComponent {
  state = {
    modelIsOpen: false,
    personName: "",
    groupName: "",
    value: "public",
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "personName") {
      this.setState({ personName: value });
    } else if (name === "groupName") {
      this.setState({ groupName: value });
    }
  };
  _handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    console.log(this.state.groupName, this.state.personName, this.state.value);
    return (
      <>
        <div class="container row col-12 m-auto pt-0">
          <div class="col-3 row mt-3 ml-5 border ">
            <i
              class="fa fa-users"
              aria-hidden="true"
              style={{ color: "blue", marginBottom: "0px" }}
            ></i>
            <h5 className="col-6 mb-3">Groups </h5>
            <div className="col-12 bg bg-light mb-3">
              <h5>discover</h5>
            </div>
            <Button
              type="primary"
              onClick={() => this.setState({ modelIsOpen: true })}
            >
              +Create Group
            </Button>
          </div>
          <div className="col-5"></div>
          <div className="col-1"></div>
          <div className="col-3"></div>
        </div>
        <Modal
          className="Modal"
          isOpen={this.state.modelIsOpen}
          onRequestClose={() => {
            this.setState({ modelIsOpen: false });
          }}
        >
          <div
            style={{
              marginTop: "10rem",
              marginLeft: "30%",
              height: "500px",
              width: "510px",
              border: "1px solid #282c3452",
            }}
            className="row"
          >
            <i
              onClick={() => {
                this.setState({ modelIsOpen: false });
              }}
              class="fas fa-window-close"
              style={{ marginLeft: "510px", marginTop: "0rem" }}
            ></i>
          </div>
          <div
            className="bg-light mb-3"
            style={{ width: "500px", marginLeft: "30.5%" }}
          >
            <p style={{ marginTop: "-35rem" }} className="col-12">
              Create Group
            </p>
          </div>
          <div
            className="bg-light mb-3"
            style={{ width: "500px", marginLeft: "30.5%" }}
          >
            <p>
              <img
                style={{
                  height: "5rem",
                  width: "5rem",
                  borderTopRightRadius: "30px",
                  borderBottomRightRadius: "30px",
                }}
                src="https://www.w3schools.com/bootstrap4/img_avatar3.png"
                alt=""
              />
              Groups are great for getting things done and staying in touch with
              just the people you want. Share photos and videos, have
              conversations, make plans and more.
            </p>
          </div>
          <div
            className=" mb-3"
            style={{ width: "500px", marginLeft: "30.5%" }}
          >
            <label htmlFor="input"> Name your group</label>
            <input
              style={{ width: "500px" }}
              type="text"
              value={this.state.groupName}
              name="groupName"
              onChange={this.handleChange}
              placeholder="Enter group name"
            ></input>
          </div>
          <div
            className=" mb-3 row"
            style={{ width: "500px", marginLeft: "30.5%" }}
          >
            <label htmlFor="input"> Add some people</label>
            <input
              style={{ width: "500px" }}
              type="name"
              onChange={this.handleChange}
              value={this.state.personName}
              name="personName"
              className="mb-3"
              placeholder="Enter person name"
            ></input>
            <label htmlFor="input"> Add some people</label>
            <DebounceInput
              className="form-control border-0 col-11 pt-0 rounded-0  mb-3"
              placeholder="search"
              minLength={1}
              debounceTimeout={1000}
              onChange={(e) => this.props.searchFriend1(e.target.value)}
            />
            <div
              className=" p-0 shadow rounded-bottom text-center justify-content-center bg-light"
              style={{
                position: "absolute",
                zIndex: "100",
                overflow: "hidden",
              }}
            >
              {this.props.searchResult1 !== null
                ? this.props.searchResult1.map((e) => {
                    let friend = false;
                    let check = this.props.friendId.find((d) => d === e._id);
                    if (check !== undefined) {
                      friend = true;
                    }
                    return (
                      <div
                        key={Math.random()}
                        className="card bg-light text-dark text-center rounded-0 col-12 pl-4 pr-2"
                      >
                        <div className="card-body p-2 row justify-content-between col-12">
                          <p className="d-inline">{`${e.firstname} ${e.lastname}`}</p>
                          <div className="row btn-group">
                            {friend === false ? (
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => {
                                  this.props.sendRequest();
                                  this.props.socket.emit("friendRequest", {
                                    to: e._id,
                                    from: this.props.userid,
                                    time: new Date().toLocaleString,
                                  });
                                }}
                              >
                                Add to group
                              </button>
                            ) : (
                              <button className="btn btn-primary btn-sm">
                                View profile
                              </button>
                            )}
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                console.log(new Date().toLocaleString())
                              }
                            >
                              Visit profile
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
            <select
              ref={(ref) => {
                this._select = ref;
              }}
              defaultValue={this.state.value}
              onChange={this._handleChange}
              className="ui fluid dropdown mb-3"
            >
              <option value="public">Public</option>
              <option value="privacy">Privacy</option>
            </select>

            <Button className="col-6">cancel</Button>
            <Button className="col-6" type="primary">
              +Create Group
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default withState(Group);
