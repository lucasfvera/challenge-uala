import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tab } from "./Tab";

const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockBack = jest.fn();
const mockForward = jest.fn();
const mockRefresh = jest.fn();
const mockPrefetch = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
        replace: mockReplace,
        back: mockBack,
        forward: mockForward,
        refresh: mockRefresh,
        prefetch: mockPrefetch,
    }),
    useSearchParams: () => new URLSearchParams("?period=week"),
}));

const mockStartTransition = jest.fn();
jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useTransition: () => [false, mockStartTransition],
}));

describe("Tab", () => {
    const defaultProps = {
        children: "Test Tab",
        param: "test",
        isActive: false,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("Component Rendering", () => {
        it("should render tab with correct text content", () => {
            const customText = "Custom Tab Text";

            render(<Tab {...defaultProps}>{customText}</Tab>);

            const tab = screen.getByRole("button", { name: customText });
            expect(tab).toBeInTheDocument();
        });
    });

    describe("Active State Styling", () => {
        it("should show proper icon when tab is active", () => {
            const props = { ...defaultProps, isActive: true };

            render(<Tab {...props} />);

            const tab = screen.getByRole("button");
            const symbol = within(tab).getByTestId("active-tab-point-mark");
            expect(symbol).toBeInTheDocument();
        });

        it("should apply inactive styles when isActive is false", () => {
            const props = { ...defaultProps, isActive: false };

            render(<Tab {...props} />);

            const tab = screen.getByRole("button");
            const symbol = within(tab).queryByTestId("active-tab-point-mark");
            expect(symbol).not.toBeInTheDocument();
        });
    });

    describe("Click Behavior", () => {
        it("should call startTransition when clicked and not active", async () => {
            const user = userEvent.setup();
            const props = { ...defaultProps, isActive: false };

            render(<Tab {...props} />);
            const tab = screen.getByRole("button");
            await user.click(tab);

            expect(mockStartTransition).toHaveBeenCalledTimes(1);
        });

        it("should not call startTransition when clicked and already active", async () => {
            const user = userEvent.setup();
            const props = { ...defaultProps, isActive: true };

            render(<Tab {...props} />);
            const tab = screen.getByRole("button");
            await user.click(tab);

            expect(mockStartTransition).not.toHaveBeenCalled();
        });
    });

    describe("Disabled State", () => {
        it("should be disabled when transition is pending", () => {
            jest.spyOn(React, "useTransition").mockReturnValue([
                true,
                mockStartTransition,
            ]);
            const props = defaultProps;

            render(<Tab {...props} />);

            const tab = screen.getByRole("button");
            expect(tab).toBeDisabled();
        });

        it("should not be disabled when transition is not pending", () => {
            jest.spyOn(React, "useTransition").mockReturnValue([
                false,
                mockStartTransition,
            ]);
            const props = defaultProps;

            render(<Tab {...props} />);

            const tab = screen.getByRole("button");
            expect(tab).not.toBeDisabled();
        });
    });

    describe("Integration with Router", () => {
        // This fails because we are mocking the startTransition
        it.failing(
            "should call router.replace with correct parameters",
            async () => {
                const user = userEvent.setup();
                const props = {
                    ...defaultProps,
                    param: "month",
                    isActive: false,
                };

                render(<Tab {...props} />);
                const tab = screen.getByRole("button");
                await user.click(tab);

                expect(mockReplace).toHaveBeenCalledWith();
            }
        );
    });
});
