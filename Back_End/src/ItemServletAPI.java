import javax.json.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;


@WebServlet(urlPatterns = {"/pages/item/*"})
public class ItemServletAPI extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.addHeader("Access-Control-Allow-Origin", "*");
        resp.addHeader("Content-Type", "application/json");

        String code = req.getParameter("code");
        String itemName = req.getParameter("itemName");
        String quantity = req.getParameter("quantity");
        String unitePrice = req.getParameter("unitPrice");

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/spa", "root", "1234");

            PreparedStatement pstm = connection.prepareStatement("insert into item values(?,?,?,?)");
            pstm.setObject(1, code);
            pstm.setObject(2, itemName);
            pstm.setObject(3, quantity);
            pstm.setObject(4, unitePrice);

            if (pstm.executeUpdate() > 0) {
                JsonObjectBuilder response = Json.createObjectBuilder();
                response.add("state", "Ok");
                response.add("message", "Successfully Added.!");
                response.add("data", "");
                resp.getWriter().print(response.build());
            }


        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);

        } catch (SQLException e) {
            resp.addHeader("Content-Type", "application/json");
            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("state", "Error");
            response.add("message", e.getMessage());
            response.add("data", "");
            resp.setStatus(400);
            resp.getWriter().print(response.build());
        }


    }


    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.addHeader("Access-Control-Allow-Origin", "*");
        resp.addHeader("Content-Type", "application/json");
        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();
        String code = jsonObject.getString("code");
        String itemName = jsonObject.getString("itemName");
        String quantity = jsonObject.getString("quantity");
        String unitPrice = jsonObject.getString("unitPrice");

        try {
            Class.forName("com.mysql.jdbc.Driver");

            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/spa", "root", "1234");

            PreparedStatement pstm = connection.prepareStatement("update item set item_name=?,quantity=?,unit_price=? where code=?");
            pstm.setObject(4, code);
            pstm.setObject(3, unitPrice);
            pstm.setObject(1, itemName);
            pstm.setObject(2, quantity);

            if (pstm.executeUpdate() > 0) {
                JsonObjectBuilder response = Json.createObjectBuilder();
                response.add("state", "Ok");
                response.add("message", "Successfully Added.!");
                response.add("data", "");
                resp.getWriter().print(response.build());
            } else {
                JsonObjectBuilder response = Json.createObjectBuilder();
                response.add("state", "Ok");
                response.add("message", "fail Added.!");
                response.add("data", "");
                resp.getWriter().print(response.build());
            }
        } catch (ClassNotFoundException e) {
            resp.addHeader("Content-Type", "application/json");
            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("state", "Error");
            response.add("message", e.getMessage());
            response.add("data", "");
            resp.setStatus(400);
            resp.getWriter().print(response.build());

        } catch (SQLException e) {
            resp.addHeader("Content-Type", "application/json");
            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("state", "Error");
            response.add("message", e.getMessage());
            response.add("data", "");
            resp.setStatus(400);
            resp.getWriter().print(response.build());
        }


    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //Add Headers
        resp.addHeader("Access-Control-Allow-Origin", "*");
        resp.addHeader("Content-Type", "application/json");

        String code = req.getParameter("code");
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/spa ", "root", "1234");

            PreparedStatement pstm = connection.prepareStatement("delete from item where code=?");
            pstm.setObject(1, code);

            if (pstm.executeUpdate() > 0) {
                JsonObjectBuilder response = Json.createObjectBuilder();
                response.add("state", "Ok");
                response.add("message", "Successfully Deleted.!");
                response.add("data", "");
                resp.getWriter().print(response.build());
            }else{
                JsonObjectBuilder response = Json.createObjectBuilder();
                response.add("state", "Ok");
                response.add("message", "failed Delete.!");
                response.add("data", "");
                resp.getWriter().print(response.build());
            }
        } catch (ClassNotFoundException e) {
            resp.addHeader("Content-Type", "application/json");
            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("state", "Error");
            response.add("message", e.getMessage());
            response.add("data", "");
            resp.setStatus(400);
            resp.getWriter().print(response.build());
        } catch (SQLException e) {
            resp.addHeader("Content-Type", "application/json");
            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("state", "Error");
            response.add("message", e.getMessage());
            response.add("data", "");
            resp.setStatus(400);
            resp.getWriter().print(response.build());
        }
    }


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {
            getAllItems(req, resp);
        } else {
            getSpecificItem(req, resp, pathInfo.substring(1)); // Assuming pathInfo is "/itemCode"
        }
    }

    private void getAllItems(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.addHeader("Access-Control-Allow-Origin", "*");
        resp.addHeader("Content-Type", "application/json");

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/spa", "root", "1234");
            PreparedStatement pstm = connection.prepareStatement("select * from item");
            ResultSet rst = pstm.executeQuery();
            JsonArrayBuilder allItems = Json.createArrayBuilder();
            while (rst.next()) {
                String code = rst.getString(1);
                String item_name = rst.getString(2);
                String quantity = rst.getString(3);
                String unit_price = rst.getString(4);

                JsonObjectBuilder itemObject = Json.createObjectBuilder();
                itemObject.add("code", code);
                itemObject.add("item_name", item_name);
                itemObject.add("quantity", quantity);
                itemObject.add("unit_price", unit_price);
                allItems.add(itemObject.build());
            }

            resp.getWriter().print(allItems.build());

        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    private void getSpecificItem(HttpServletRequest req, HttpServletResponse resp, String itemCode) throws ServletException, IOException {
        resp.addHeader("Access-Control-Allow-Origin", "*");
        resp.addHeader("Content-Type", "application/json");

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/spa", "root", "1234");

            PreparedStatement pstm = connection.prepareStatement("SELECT * FROM item WHERE code = ?");
            pstm.setString(1, itemCode);

            ResultSet rst = pstm.executeQuery();
            if (rst.next()) {
                String code = rst.getString(1);
                String itemName = rst.getString(2);
                String quantity = rst.getString(3);
                String unitPrice = rst.getString(4);

                JsonObjectBuilder itemObject = Json.createObjectBuilder();
                itemObject.add("code", code);
                itemObject.add("itemName", itemName);
                itemObject.add("quantity", quantity);
                itemObject.add("unitPrice", unitPrice);

                resp.getWriter().print(itemObject.build());
            } else {
                resp.setStatus(404);  // Not found
                resp.getWriter().print(Json.createObjectBuilder().add("error", "Item not found").build());
            }

        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }






    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.addHeader("Access-Control-Allow-Origin", "*");
        resp.addHeader("Access-Control-Allow-Methods", "PUT, DELETE");
        resp.addHeader("Access-Control-Allow-Headers", "content-type");
    }
}
