import { Component } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button"; 

const Board = ({
  id,
  title,
  registerId,
  registerDate,
  props,
}: {
  id: number;
  title: string;
  registerId: string;
  registerDate: string;
  props: any;
}) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          value={id}
          onChange={(e) => {
            props.onCheckboxChange(
              e.currentTarget.checked,
              e.currentTarget.value
            );
          }}
        ></input>
      </td>
      <td>{id}</td>
      <td>{title}</td>
      <td>{registerId}</td>
      <td>{registerDate}</td>
    </tr>
  );
};

/**
 * BoardList class
 */
class BoardList extends Component {
  state = {
    boardList: [],
    checkList: [],
  };

  getList = () => {
    Axios.get("http://localhost:3000/list", {})
      .then((res) => {
        const { data } = res;
        this.setState({
          boardList: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  onCheckboxChange = (e: any) => {
    const list: Array<string> = this.state.checkList;
    list.push(e.target.value);
    this.setState({
      checkList: list,
    });
  };

  /**
   */
  componentDidMount() {
    this.getList();
  }

  /**
   * @return {Component} Component
   */
  render() {
    // eslint-disable-next-line
    const { boardList }: { boardList: any } = this.state;

    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>선택</th>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {
              // eslint-disable-next-line
              boardList.map((v: any) => {
                return (
                  <Board
                    id={v.BOARD_ID}
                    title={v.BOARD_TITLE}
                    registerId={v.REGISTER_ID}
                    registerDate={v.REGISTER_DATE}
                    key={v.BOARD_ID}
                    props={this}
                  />
                );
              })
            }
          </tbody>
        </Table>
        <Button variant="info">글쓰기</Button>
        <Button variant="secondary">수정하기</Button>
        <Button variant="danger">삭제하기</Button>
      </div>
    );
  }
}

export default BoardList;
