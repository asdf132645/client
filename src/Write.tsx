import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";

interface IProps {
  isModifyMode: boolean;
  boardId: number;
  handleCancel: any;
}


/**
 * Write class
 * @param {SS} e
 */
class Write extends Component<IProps> {
  /**
   * @return {Component} Component
   */
  /**
   * @param {SS} props
   */

  state = {
    isModifyMode: false,
    title: "",
    content: "",
  };
  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      content: "",
      isModifyMode: false,
    };
  }

  write = () => {
    Axios.post("http://localhost:3000/insert", {
      title: this.state.title,
      content: this.state.content,
    })
      .then((res) => {
        this.setState({
          title: "",
          content: "",
        });
        this.props.handleCancel();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  update = () => {
    Axios.post("http://localhost:3000/update", {
      title: this.state.title,
      content: this.state.content,
      id: this.props.boardId,
    })
      .then((res) => {
        this.setState({
          title: "",
          content: "",
        });
        this.props.handleCancel();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  detail = () => {
    Axios.post("http://localhost:3000/detail", {
      id: this.props.boardId,
    })
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            title: res.data[0].BOARD_TITLE,
            content: res.data[0].BOARD_CONTENT,
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // eslint-disable-next-line
  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  /**
   *
   * @param {any} prevProps
   */
  componentDidUpdate = (prevProps: any) => {
    if (this.props.isModifyMode && this.props.boardId !== prevProps.boardId) {
      this.detail();
    }
  };

  /**
   * @return {Component} Component
   */
  render() {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleChange}
              placeholder="제목을 입력하세요"
              name="title"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              onChange={this.handleChange}
              placeholder="내용을 입력하세요"
              name="content"
            />
          </Form.Group>
        </Form>
        <Button
          variant="info"
          onClick={!this.state.isModifyMode ? this.write : this.update}
        >
          작성완료
        </Button>
        <Button variant="secondary" onClick={this.props.handleCancel}>
          취소
        </Button>
      </div>
    );
  }
}

export default Write;
