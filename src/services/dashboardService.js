import dashboardRepository from "../repositories/dashboardRepository.js";


function validateDateRange(startDate,endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);


    if (Number.isNaN(start.getTime())) {
        throw new Error(
            "A data inicial é inválida!"
        );
    }


    if (Number.isNaN(end.getTime())) {
        throw new Error(
            "A data final é inválida!"
        );
    }


    if (start > end) {
        throw new Error(
            "A data inicial não pode ser maior que a data final!"
        );
    }


    return {
        startDate,
        endDate
    };
};


async function getSummary(userId,startDate,endDate) {
    validateDateRange(
        startDate,
        endDate
    );


    const income =
        await dashboardRepository.getTotalIncome(
            userId,
            startDate,
            endDate
        );


    const expense =
        await dashboardRepository.getTotalExpense(
            userId,
            startDate,
            endDate
        );


    const pending =
        await dashboardRepository.getPendingExpenses(
            userId
        );


    const expensesByCategory =
        await dashboardRepository.getExpensesByCategory(
            userId,
            startDate,
            endDate
        );


    const financialEvolution =
        await dashboardRepository.getFinancialEvolution(
            userId,
            startDate,
            endDate
        );


    const normalizedIncome =
        Number(income || 0);


    const normalizedExpense =
        Number(expense || 0);


    const normalizedPending =
        Number(pending || 0);


    const balance = normalizedIncome - normalizedExpense;
    const savingsRate = normalizedIncome > 0 ? ((normalizedIncome - normalizedExpense)/ normalizedIncome) * 100 : 0;
    return {

        period: {
            start_date: startDate,
            end_date: endDate
        },

        income: normalizedIncome,
        expense: normalizedExpense,
        balance,
        pending: normalizedPending,
        savings_rate:Number(savingsRate.toFixed(2)),
        expenses_by_category:expensesByCategory,
        financial_evolution:financialEvolution
    };
};

export default {
    getSummary
};