import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
} from "reactstrap";
import PropTypes from "prop-types";

import {
  AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler,
} from "@coreui/react";
import logo from "../../assets/img/brand/OneCardLogo.png";
import sygnet from "../../assets/img/brand/sygnet.png";
import {
  authenticated,
  verifyGoogleLogin,
} from "../../store/authentication/acions";
import { connect } from "react-redux";
import axios from "../../axios-instance";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  /*componentDidMount() {
    if(!this.props.profileObj){
      this.props.history.push('/login')
    }
  }*/

  async verifyToken(tokenId) {
    let postData = {
      id_token: tokenId,
    };
    axios
      .post("/verifyGoogleLogin", postData)
      .then((response) => {
        if (!response.data.status) {
          this.props.history.push("/login");
        }
      })
      .catch((error) => {
        this.props.history.push({
          pathname: '/error_page',
          errorObj: error,
        });
      });
  }

  verifyProfile(profileObj) {
    if (!this.props.profileObj) {
      this.props.history.push("/login");
    } else {
      if (this.props.profileObj.tokenId) {
        this.verifyToken(this.props.profileObj.tokenId);
      } else {
        this.props.history.push("/login");
      }
    }
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    //this.verifyProfile(this.props.profileObj);
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25 }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: "CoreUI Logo" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link">
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/manage-applications" className="nav-link">
              Manage Applications
            </Link>
          </NavItem>

          <UncontrolledDropdown nav direction="down" className="mr-3">
            <DropdownToggle nav>
              Manage Masters <i className="fa fa-chevron-down" />
            </DropdownToggle>
            <DropdownMenu left="true">
              <DropdownItem>
                Manage Masters 1<Badge color="info">30</Badge>
              </DropdownItem>
              <DropdownItem>
                Manage Masters 2<Badge color="success">60</Badge>
              </DropdownItem>
              <DropdownItem>
                Manage Masters 3<Badge color="danger">20</Badge>
              </DropdownItem>
              <DropdownItem>
                Manage Masters 4<Badge color="warning">70</Badge>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown nav direction="down" className="mr-3">
            <DropdownToggle nav>
              Reports <i className="fa fa-chevron-down" />
            </DropdownToggle>
            <DropdownMenu left="true">
              <DropdownItem>
                Reports 1<Badge color="info">33</Badge>
              </DropdownItem>
              <DropdownItem>
                Reports 2<Badge color="success">65</Badge>
              </DropdownItem>
              <DropdownItem>
                Reports 3<Badge color="danger">23</Badge>
              </DropdownItem>
              <DropdownItem>
                Reports 4<Badge color="warning">78</Badge>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>

        <Nav className="ml-auto" navbar>
          {this.props.profileObj ? (
            <label>{this.props.profileObj.profileObj.name}</label>
          ) : (
            <label></label>
          )}

          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              {this.props.profileObj ? (
                <img
                  src={this.props.profileObj.profileObj.imageUrl}
                  className="img-avatar"
                  alt="admin@bootstrapmaster.com"
                />
              ) : (
                <img
                  src={"../../assets/img/avatars/6.jpg"}
                  className="img-avatar"
                  alt="admin@bootstrapmaster.com"
                />
              )}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center">
                <strong>Account</strong>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-bell-o"></i> Updates
                <Badge color="info">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-envelope-o"></i> Messages
                <Badge color="success">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-tasks"></i> Tasks
                <Badge color="danger">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-comments"></i> Comments
                <Badge color="warning">42</Badge>
              </DropdownItem>
              <DropdownItem header tag="div" className="text-center">
                <strong>Settings</strong>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-user"></i> Profile
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-wrench"></i> Settings
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-usd"></i> Payments
                <Badge color="secondary">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-file"></i> Projects
                <Badge color="primary">42</Badge>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <i className="fa fa-shield"></i> Lock Account
              </DropdownItem>
              <DropdownItem
                /*onClick={(e) => {
                  this.props.logOut();
                  this.props.onLogout();                  
                }}*/
              >
                <i className="fa fa-lock"></i>Logout                
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    profileObj: state.authentication.profileObj,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(authenticated(false, null)),
  verifyGoogleLogin: (googleLoginResponse, history, path) =>
    dispatch(verifyGoogleLogin(googleLoginResponse, history, path)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DefaultHeader)
);

// export default DefaultHeader;
