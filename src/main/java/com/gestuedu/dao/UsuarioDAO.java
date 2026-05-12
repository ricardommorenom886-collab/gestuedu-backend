package com.gestuedu.dao;

import com.gestuedu.database.ConexionBD;
import com.gestuedu.models.Usuario;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class UsuarioDAO {

    public boolean registrarUsuario(Usuario usuario) {
        String sql = "INSERT INTO usuarios (nombres, apellidos, fecha_nacimiento, tipo_documento, numero_documento, correo, password, tipo_usuario) "
                + "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conexion = ConexionBD.getConnection();
             PreparedStatement stmt = conexion.prepareStatement(sql)) {

            stmt.setString(1, usuario.getNombres());
            stmt.setString(2, usuario.getApellidos());
            stmt.setString(3, usuario.getFechaNacimiento());
            stmt.setString(4, usuario.getTipoDocumento());
            stmt.setString(5, usuario.getNumeroDocumento());
            stmt.setString(6, usuario.getCorreo());
            stmt.setString(7, usuario.getPassword());
            stmt.setString(8, usuario.getTipoUsuario());

            int filas = stmt.executeUpdate();
            return filas > 0;

        } catch (SQLException e) {
            System.err.println("❌ Error al registrar usuario: " + e.getMessage());
            return false;
        }
    }
}
