import React from "react";
import { render, screen } from "@testing-library/react";
import { SummaryValue } from "./SummaryValue";
import { Transaction } from "@/services/transactions/types";

describe("SummaryValue", () => {
    // Test data
    const mockTransactions: Transaction[] = [
        {
            id: "1",
            amount: 100.5,
            card: "visa",
            installments: 1,
            createdAt: "2025-01-01T10:00:00Z",
            updatedAt: "2025-01-01T10:00:00Z",
            paymentMethod: "link",
        },
        {
            id: "2",
            amount: 250.5,
            card: "mastercard",
            installments: 3,
            createdAt: "2025-01-01T11:00:00Z",
            updatedAt: "2025-01-01T11:00:00Z",
            paymentMethod: "qr",
        },
        {
            id: "3",
            amount: 50,
            card: "amex",
            installments: 1,
            createdAt: "2025-01-01T12:00:00Z",
            updatedAt: "2025-01-01T12:00:00Z",
            paymentMethod: "mpos",
        },
    ];

    const totalMockedAmount = mockTransactions
        .reduce((total, tr) => total + tr.amount, 0)
        .toFixed(2)
        .toString()
        .replace(".", ",");

    describe("Component Rendering with Data", () => {
        beforeEach(() => {
            jest.restoreAllMocks();
        });

        it("should render the total earnings amount correctly", async () => {
            jest.spyOn(React, "use").mockReturnValue({
                data: mockTransactions,
                error: null,
            });

            // Act
            //@ts-expect-error We mock the return of use hook
            render(<SummaryValue asyncTransactions={"MOCKED"} />);
            // Assert
            const totalAmount = screen.getByText((content, element) => {
                // Check if the element is the <p> tag
                if (!element) return false;
                const isParagraph = element.tagName.toLowerCase() === "p";
                // Check if the <p> tag's combined text content matches the full string
                const hasCorrectText =
                    element.textContent === `+ $ ${totalMockedAmount}`;
                return isParagraph && hasCorrectText;
            });
            expect(totalAmount).toBeInTheDocument();
        });

        it("should format the amount with proper decimal places", () => {
            // Arrange
            const transactionsWithDecimals: Transaction[] = [
                {
                    id: "1",
                    amount: 100.9876,
                    card: "visa",
                    installments: 1,
                    createdAt: "2025-01-01T10:00:00Z",
                    updatedAt: "2025-01-01T10:00:00Z",
                    paymentMethod: "link",
                },
            ];
            jest.spyOn(React, "use").mockReturnValue({
                data: transactionsWithDecimals,
                error: null,
            });

            // Act
            //@ts-expect-error We mock the return of use hook
            render(<SummaryValue asyncTransactions={"MOCKED"} />);

            // Assert
            const totalAmount = screen.getByText((content, element) => {
                // Check if the element is the <p> tag
                if (!element) return false;
                const isParagraph = element.tagName.toLowerCase() === "p";
                // Check if the <p> tag's combined text content matches the full string
                const hasCorrectText = element.textContent === `+ $ 100,99`;
                return isParagraph && hasCorrectText;
            });
            expect(totalAmount).toBeInTheDocument();
        });

        it("should handle amounts with no decimal places", () => {
            // Arrange
            const transactionsWithNoDecimals: Transaction[] = [
                {
                    id: "1",
                    amount: 100,
                    card: "visa",
                    installments: 1,
                    createdAt: "2025-01-01T10:00:00Z",
                    updatedAt: "2025-01-01T10:00:00Z",
                    paymentMethod: "link",
                },
            ];
            jest.spyOn(React, "use").mockReturnValue({
                data: transactionsWithNoDecimals,
                error: null,
            });

            // Act
            //@ts-expect-error We mock the return of use hook
            render(<SummaryValue asyncTransactions={"MOCKED"} />);

            // Assert
            const totalAmount = screen.getByText((content, element) => {
                // Check if the element is the <p> tag
                if (!element) return false;
                const isParagraph = element.tagName.toLowerCase() === "p";
                // Check if the <p> tag's combined text content matches the full string
                const hasCorrectText = element.textContent === `+ $ 100,00`;
                return isParagraph && hasCorrectText;
            });
            expect(totalAmount).toBeInTheDocument();
        });

        it("should handle zero amount transactions", () => {
            // Arrange
            const zeroTransactions: Transaction[] = [
                {
                    id: "1",
                    amount: 0,
                    card: "visa",
                    installments: 1,
                    createdAt: "2025-01-01T10:00:00Z",
                    updatedAt: "2025-01-01T10:00:00Z",
                    paymentMethod: "link",
                },
            ];
            jest.spyOn(React, "use").mockReturnValue({
                data: zeroTransactions,
                error: null,
            });

            // Act
            //@ts-expect-error We mock the return of use hook
            render(<SummaryValue asyncTransactions={"MOCKED"} />);

            // Assert
            const totalAmount = screen.getByText((content, element) => {
                // Check if the element is the <p> tag
                if (!element) return false;
                const isParagraph = element.tagName.toLowerCase() === "p";
                // Check if the <p> tag's combined text content matches the full string
                const hasCorrectText = element.textContent === `+ $ 0,00`;
                return isParagraph && hasCorrectText;
            });
            expect(totalAmount).toBeInTheDocument();
        });
    });

    describe("Error Handling", () => {
        it("should display error message when error occurs", () => {
            // Arrange
            const mockError = new Error("Failed to fetch transactions");
            jest.spyOn(React, "use").mockReturnValue({
                data: null,
                error: mockError,
            });

            // Act
            //@ts-expect-error We mock the return of use hook
            render(<SummaryValue asyncTransactions={"MOCKED"} />);

            // Assert
            const errorMessage = screen.getByText(
                "Failed to fetch transactions"
            );
            expect(errorMessage).toBeInTheDocument();
        });
    });

    describe.skip("Edge Cases", () => {
        it.todo("should handle undefined data gracefully");

        it.todo("should handle transactions with missing amount property");

        it.todo("should handle transactions with non-numeric amounts");
    });
});
