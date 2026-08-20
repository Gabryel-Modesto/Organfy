import dashboardService from "../services/dashboardService.js";


class DashboardController {

    async getSummary(req, res) {

        try {

            const {
                start_date,
                end_date
            } = req.query;


            if (!start_date || !end_date) {

                return res.status(400).json({
                    message:
                        "Informe a data inicial e a data final!"
                });
            }


            const summary =
                await dashboardService.getSummary(
                    req.user.id_user,
                    start_date,
                    end_date
                );


            return res.status(200).json(
                summary
            );

        } catch (error) {

            return res.status(400).json({
                message: error.message
            });
        }
    }
}


export default new DashboardController();