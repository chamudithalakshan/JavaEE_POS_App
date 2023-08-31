import javax.json.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;


@WebServlet(urlPatterns = {"/pages/placeOrder"})
public class PurchaseOrderServletAPI extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.addHeader("Access-Control-Allow-Origin", "*");
        resp.addHeader("Content-Type", "application/json");

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/spa", "root", "1234");
            PreparedStatement pstm = connection.prepareStatement("select `cid` from Customer");
            ResultSet rst = pstm.executeQuery();
            JsonArrayBuilder allCustomers = Json.createArrayBuilder();
            while (rst.next()) {
                String id = rst.getString(1);

                JsonObjectBuilder customerIdObject = Json.createObjectBuilder();
                customerIdObject.add("cid", id);
                allCustomers.add(customerIdObject.build());
            }

            resp.getWriter().print(allCustomers.build());

        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }


    }


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.addHeader("Access-Control-Allow-Origin", "*");
        resp.addHeader("Content-Type", "application/json");
        Connection connection = null;

        System.out.println("Placing Order");
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/spa", "root", "1234");

            JsonReader reader = Json.createReader(req.getReader());
            JsonObject orderData = reader.readObject();

            String customerID = orderData.getString("customerID");
            String orderDate = orderData.getString("date");
            String orderId = orderData.getString("orderId");
            double total = Double.parseDouble(orderData.getString("total"));
            JsonArray items = orderData.getJsonArray("items");

            if (items.isEmpty()) {
                sendErrorResponse(resp, "No items in order");
                return;
            }

            connection.setAutoCommit(false);


            String insertOrderSQL = "INSERT INTO `Order` (orderId,cid, date, total) VALUES (?, ?, ?,?)";
            PreparedStatement stmt = connection.prepareStatement(insertOrderSQL, Statement.RETURN_GENERATED_KEYS);
            stmt.setString(0, orderId);
            stmt.setString(1, customerID);
            stmt.setString(2, orderDate);
            stmt.setDouble(3, total);
            stmt.executeUpdate();

            ResultSet rs = stmt.getGeneratedKeys();
            if (orderId != null) {
                String insertOrderDetailSQL = "INSERT INTO OrderDetails (orderID, itemCode, quantity) VALUES (?, ?, ?)";
                PreparedStatement detailStmt = connection.prepareStatement(insertOrderDetailSQL);
                for (int i = 0; i < items.size(); i++) {
                    JsonObject item = items.getJsonObject(i);
                    detailStmt.setString(1, orderId);
                    detailStmt.setString(2, item.getString("code"));
                    detailStmt.setInt(3, item.getInt("qty"));
                    detailStmt.addBatch();
                }
                detailStmt.executeBatch();

                connection.commit();

                JsonObjectBuilder response = Json.createObjectBuilder();
                response.add("state", "Ok");
                response.add("message", "Order successfully placed!");
                resp.getWriter().print(response.build());
            }

        } catch (Exception e) {
            if (connection != null) {
                try {
                    connection.rollback();
                } catch (SQLException ex) {
                    throw new RuntimeException(ex);
                }
            }
            sendErrorResponse(resp, e.getMessage());
        }
    }

    private void sendErrorResponse(HttpServletResponse resp, String message) throws IOException {
        JsonObjectBuilder response = Json.createObjectBuilder();
        response.add("state", "Error");
        response.add("message", message);
        resp.setStatus(400);
        resp.getWriter().print(response.build());
    }


}
