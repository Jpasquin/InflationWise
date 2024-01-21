export function useCalculateDebt() {
  const calculateDebt = (remainingBalance, monthlyPayment, interestRate) => {
    if (monthlyPayment <= 0 || interestRate <= 0 || remainingBalance <= 0) {
      return { years: 0, totalInterest: 0, totalPayments: 0 };
    }

    // Convert annual interest rate percentage to a decimal and then to a monthly rate
    const monthlyInterestRate = (interestRate / 100) / 12;

    // Calculate the number of months required to repay the loan
    const months = Math.log(monthlyPayment / (monthlyPayment - remainingBalance * monthlyInterestRate)) / Math.log(1 + monthlyInterestRate);

    // If the result is not realistic (e.g., payments too low to cover the interest), return an error state
    if (!isFinite(months)) {
      return { years: 'Infinity', totalInterest: 'Infinity', totalPayments: 'Infinity' };
    }

    const totalPayments = months * monthlyPayment;
    const totalInterest = totalPayments - remainingBalance;

    return {
      years: (months / 12).toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayments: totalPayments.toFixed(2)
    };
  };

  return {
    calculateDebt
  };
}
