import React from "react";
import SendMessageForm from "../components/SendMessageForm";
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

describe("<SendMessageForm />", function () {
	it("should render <SendMessageForm /> component form section", function () {
		const SendMessage = shallow( <SendMessageForm /> );
		expect(SendMessage.find("form")).to.have.length(1);
		expect(SendMessage.find("#message")).to.have.length(1);
		expect(SendMessage.find("#message").type()).to.equal("input");
	});
});
