import React from "react";
import ChatBox from "../components/ChatBox";
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

describe("<ChatBox />", function () {
	it("should render <ChatBox /> component window", function () {
		const chatWindow = shallow( <ChatBox /> );
		expect(chatWindow.find("div")).to.have.length(1);
		expect(chatWindow.find("div").text()).to.be.a("string");
		expect(chatWindow.find("div").text()).to.equal("Loading message...");
	});
});
