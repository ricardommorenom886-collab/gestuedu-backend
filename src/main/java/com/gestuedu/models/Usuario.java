package com.gestuedu.models;

public class Usuario {
    private int id;
    private String nombres;
    private String apellidos;
    private String fechaNacimiento;
    private String tipoDocumento;
    private String numeroDocumento;
    private String correo;
    private String password;
    private String tipoUsuario;

    // Constructor vacío
    public Usuario() {}

    // Constructor sin ID (para nuevos registros)
    public Usuario(String nombres, String apellidos, String fechaNacimiento,
                   String tipoDocumento, String numeroDocumento, String correo,
                   String password, String tipoUsuario) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.fechaNacimiento = fechaNacimiento;
        this.tipoDocumento = tipoDocumento;
        this.numeroDocumento = numeroDocumento;
        this.correo = correo;
        this.password = password;
        this.tipoUsuario = tipoUsuario;
    }

    // Constructor con ID (para lecturas desde la BD)
    public Usuario(int id, String nombres, String apellidos, String fechaNacimiento,
                   String tipoDocumento, String numeroDocumento, String correo,
                   String password, String tipoUsuario) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.fechaNacimiento = fechaNacimiento;
        this.tipoDocumento = tipoDocumento;
        this.numeroDocumento = numeroDocumento;
        this.correo = correo;
        this.password = password;
        this.tipoUsuario = tipoUsuario;
    }

    // Getters y Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getNombres() { return nombres; }
    public void setNombres(String nombres) { this.nombres = nombres; }

    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }

    public String getFechaNacimiento() { return fechaNacimiento; }
    public void setFechaNacimiento(String fechaNacimiento) { this.fechaNacimiento = fechaNacimiento; }

    public String getTipoDocumento() { return tipoDocumento; }
    public void setTipoDocumento(String tipoDocumento) { this.tipoDocumento = tipoDocumento; }

    public String getNumeroDocumento() { return numeroDocumento; }
    public void setNumeroDocumento(String numeroDocumento) { this.numeroDocumento = numeroDocumento; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getTipoUsuario() { return tipoUsuario; }
    public void setTipoUsuario(String tipoUsuario) { this.tipoUsuario = tipoUsuario; }
}
