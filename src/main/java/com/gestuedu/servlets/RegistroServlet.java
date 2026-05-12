package com.gestuedu.servlets;

import com.gestuedu.dao.UsuarioDAO;
import com.gestuedu.models.Usuario;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.IOException;

public class RegistroServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        String nombres = request.getParameter("nombres");
        String apellidos = request.getParameter("apellidos");
        String fechaNacimiento = request.getParameter("fecha_nacimiento");
        String tipoDocumento = request.getParameter("tipo_documento");
        String numeroDocumento = request.getParameter("numero_documento");
        String correo = request.getParameter("correo");
        String password = request.getParameter("password");
        String tipoUsuario = request.getParameter("tipo_usuario");

        Usuario usuario = new Usuario(nombres, apellidos, fechaNacimiento, tipoDocumento,
                numeroDocumento, correo, password, tipoUsuario);

        UsuarioDAO dao = new UsuarioDAO();
        boolean registrado = dao.registrarUsuario(usuario);

        if (registrado) {
            response.sendRedirect("login.html");
        } else {
            response.getWriter().println("❌ Error al registrar el usuario.");
        }
    }
}
