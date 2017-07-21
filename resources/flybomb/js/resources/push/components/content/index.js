
import React from 'react';
import ReactDOM from 'react-dom';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Sider = React.createClass({
  getInitialState() {
    return {
      current: '1'
    };
  },
  render() {
    return (
      <div style={{float:'left'}}></div>
    );
  }
});
module.exports=Sider;