import React from "react";
import UsersList from "../components/UsersList";
import {
	configure,
	shallow,
	mount,
	render
} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
	expect
} from "chai";

configure({
	adapter: new Adapter()
});

describe("<UsersList />", function () {
	it("should render <UsersList /> component with loading user text", function () {
		const Users = shallow( <UsersList /> );
		expect(Users.find("p")).to.have.length(1);
		expect(Users.find("p").text()).to.be.a("string");
		expect(Users.find("p").text()).to.equal("Loading User...");
	});
});
