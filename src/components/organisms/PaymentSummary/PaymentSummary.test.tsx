import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PaymentSummary } from "./PaymentSummary";
import { getTransactionsByPeriod } from "@/services/transactions/actions";
import { Period } from "@/services/transactions/validation";
import { Transaction } from "@/services/transactions/types";
import { tryCatch } from "@/utils/tryCatch";

// Mock the transactions service
jest.mock("@/services/transactions/actions", () => ({
    getTransactionsByPeriod: jest.fn(),
}));

// Mock the tryCatch utility
jest.mock("@/utils/tryCatch", () => ({
    tryCatch: jest.fn(),
}));

// Mock the SummaryValue component to isolate PaymentSummary testing
jest.mock("./SummaryValue", () => ({
    SummaryValue: ({ asyncTransactions }: { asyncTransactions: unknown }) => (
        <div
            data-testid="summary-value"
            data-transactions={JSON.stringify(asyncTransactions)}
        >
            SummaryValue Component
        </div>
    ),
}));

// Mock the SummaryValueSkeleton component
jest.mock("@/components/atoms/LoadingSkeletons/SummaryValueSkeleton", () => ({
    SummaryValueSkeleton: () => (
        <div data-testid="summary-value-skeleton">Loading...</div>
    ),
}));

const mockGetTransactionsByPeriod =
    getTransactionsByPeriod as jest.MockedFunction<
        typeof getTransactionsByPeriod
    >;

describe("PaymentSummary", () => {
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
            amount: 250.75,
            card: "mastercard",
            installments: 3,
            createdAt: "2025-01-01T11:00:00Z",
            updatedAt: "2025-01-01T11:00:00Z",
            paymentMethod: "qr",
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        // Default mock implementation for tryCatch
        (tryCatch as jest.Mock).mockResolvedValue({
            data: mockTransactions,
            error: null,
        });
    });

    describe("Component Rendering", () => {
        it("should render all three period tabs with correct labels", () => {
            // Arrange
            const period: Period = "week";

            // Act
            render(<PaymentSummary period={period} />);

            // Assert
            const dayTab = screen.getByRole("button", { name: /diario/i });
            const weekTab = screen.getByRole("button", { name: /semanal/i });
            const monthTab = screen.getByRole("button", { name: /mensual/i });

            expect(dayTab).toBeInTheDocument();
            expect(weekTab).toBeInTheDocument();
            expect(monthTab).toBeInTheDocument();
        });

        it("should render the correct number of tabs", () => {
            // Arrange
            const period: Period = "day";

            // Act
            render(<PaymentSummary period={period} />);

            // Assert
            const tabs = screen.getAllByRole("button");
            expect(tabs).toHaveLength(3);
        });

        it("should render SummaryValue component wrapped in Suspense", () => {
            // Arrange
            const period: Period = "month";

            // Act
            render(<PaymentSummary period={period} />);

            // Assert
            const summaryValue = screen.getByTestId("summary-value");
            expect(summaryValue).toBeInTheDocument();
        });
    });

    describe("Tab States and Interactions", () => {
        it.failing(
            "should properly switch between tabs and mark them correctly",
            async () => {
                const user = userEvent.setup();
                // Arrange
                const period: Period = "day";

                // Act
                render(<PaymentSummary period={period} />);

                // Assert
                const dayTab = screen.getByRole("button", { name: /diario/i });
                let activeSymbolDay = within(dayTab).queryByTestId(
                    "active-tab-point-mark"
                );
                const weekTab = screen.getByRole("button", {
                    name: /semanal/i,
                });
                let activeSymbolWeek = within(weekTab).queryByTestId(
                    "active-tab-point-mark"
                );
                const monthTab = screen.getByRole("button", {
                    name: /mensual/i,
                });
                const activeSymbolMonth = within(monthTab).queryByTestId(
                    "active-tab-point-mark"
                );

                expect(activeSymbolDay).toBeInTheDocument();
                expect(activeSymbolWeek).not.toBeInTheDocument();
                expect(activeSymbolMonth).not.toBeInTheDocument();

                await user.click(weekTab);
                await waitFor(
                    () => {
                        const dayTab = screen.getByRole("button", {
                            name: /diario/i,
                        });

                        activeSymbolDay = within(dayTab).queryByTestId(
                            "active-tab-point-mark"
                        );
                        const weekTab = screen.getByRole("button", {
                            name: /semanal/i,
                        });

                        activeSymbolWeek = within(weekTab).queryByTestId(
                            "active-tab-point-mark"
                        );

                        expect(activeSymbolWeek).toBeInTheDocument();
                        expect(activeSymbolDay).not.toBeInTheDocument();
                    },
                    { timeout: 3000 }
                );
            }
        );

        it("should mark week tab as active when period is week", () => {
            // Arrange
            const period: Period = "week";

            // Act
            render(<PaymentSummary period={period} />);

            // Assert
            const weekTab = screen.getByRole("button", { name: /semanal/i });
            const symbol = within(weekTab).getByTestId("active-tab-point-mark");
            expect(symbol).toBeInTheDocument();
        });

        it("should not show active indicator for inactive tabs", () => {
            // Arrange
            const period: Period = "day";

            // Act
            render(<PaymentSummary period={period} />);

            // Assert
            const weekTab = screen.getByRole("button", { name: /semanal/i });
            const monthTab = screen.getByRole("button", { name: /mensual/i });
            const activeSymbolWeek = within(weekTab).queryByTestId(
                "active-tab-point-mark"
            );
            const activeSymbolMonth = within(monthTab).queryByTestId(
                "active-tab-point-mark"
            );

            expect(activeSymbolWeek).not.toBeInTheDocument();
            expect(activeSymbolMonth).not.toBeInTheDocument();
        });
    });

    describe("API Integration", () => {
        it("should call getTransactionsByPeriod with the provided period", async () => {
            // Arrange
            const period: Period = "month";
            mockGetTransactionsByPeriod.mockResolvedValue(mockTransactions);

            // Act
            render(<PaymentSummary period={period} />);

            // Assert
            await waitFor(() => {
                expect(mockGetTransactionsByPeriod).toHaveBeenCalledWith(
                    "month"
                );
            });
        });

        it('should call getTransactionsByPeriod with default "week" when period is undefined', async () => {
            // Arrange
            const period = undefined as unknown as Period;
            mockGetTransactionsByPeriod.mockResolvedValue(mockTransactions);

            // Act
            render(<PaymentSummary period={period} />);

            // Assert
            await waitFor(() => {
                expect(mockGetTransactionsByPeriod).toHaveBeenCalledWith(
                    "week"
                );
            });
        });

        it('should call getTransactionsByPeriod with default "week" when period is null', async () => {
            // Arrange
            const period = null as unknown as Period;
            mockGetTransactionsByPeriod.mockResolvedValue(mockTransactions);

            // Act
            render(<PaymentSummary period={period} />);

            // Assert
            await waitFor(() => {
                expect(mockGetTransactionsByPeriod).toHaveBeenCalledWith(
                    "week"
                );
            });
        });

        it("should call tryCatch with the result of getTransactionsByPeriod", async () => {
            // Arrange
            const period: Period = "day";
            mockGetTransactionsByPeriod.mockResolvedValue(mockTransactions);

            // Act
            render(<PaymentSummary period={period} />);

            // Assert
            await waitFor(() => {
                expect(tryCatch).toHaveBeenCalledWith(
                    expect.objectContaining({
                        then: expect.any(Function),
                    })
                );
            });
        });
    });
});
