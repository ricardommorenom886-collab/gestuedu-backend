/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `gestuedu` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `gestuedu`;
DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES (1,'Matemáticas',NULL,2),(2,'Castellano',NULL,2),(3,'Curso prueba',NULL,5),(4,'Matematica prueba',NULL,6),(5,'Curso final',NULL,7),(6,'Curso CRUD','Curso creado desde prueba',8);
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `estudiantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiantes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `documento` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `correo` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `edad` int DEFAULT NULL,
  `curso_id` int DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `documento` (`documento`),
  UNIQUE KEY `usuario_id` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `estudiantes` WRITE;
/*!40000 ALTER TABLE `estudiantes` DISABLE KEYS */;
INSERT INTO `estudiantes` VALUES (2,'Alumno Prueba','DOC122515','alumno@test.com',18,3,NULL),(3,'Alumno Nota','DN122528','nota@test.com',17,4,NULL),(4,'Alumno Final','FIN122638','final@test.com',18,5,NULL),(5,'Roberth','95925603','rdudiver@gmail.com',41,1,NULL),(6,'Alumno CRUD','MOD123940','alumno.crud@test.com',19,6,NULL),(7,'Alumno Flow','E131602','alumno@test.com',20,NULL,NULL),(8,'Student Role','SR131630','student@test.com',19,NULL,NULL);
/*!40000 ALTER TABLE `estudiantes` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `grupo_estudiantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupo_estudiantes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grupo_id` int NOT NULL,
  `estudiante_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_grupo_estudiante` (`grupo_id`,`estudiante_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `grupo_estudiantes` WRITE;
/*!40000 ALTER TABLE `grupo_estudiantes` DISABLE KEYS */;
INSERT INTO `grupo_estudiantes` VALUES (4,1,5),(1,3,2),(2,4,3),(3,5,4),(5,6,6),(8,7,7),(9,8,8),(10,9,9);
/*!40000 ALTER TABLE `grupo_estudiantes` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `grupo_materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupo_materias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grupo_id` int NOT NULL,
  `materia_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_grupo_materia` (`grupo_id`,`materia_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `grupo_materias` WRITE;
/*!40000 ALTER TABLE `grupo_materias` DISABLE KEYS */;
INSERT INTO `grupo_materias` VALUES (1,1,1),(2,2,2),(3,3,3),(4,4,4),(5,5,5),(6,6,6),(8,7,7),(9,8,8),(10,9,9);
/*!40000 ALTER TABLE `grupo_materias` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `grupos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `periodo` varchar(100) NOT NULL,
  `seccion` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `grupos` WRITE;
/*!40000 ALTER TABLE `grupos` DISABLE KEYS */;
INSERT INTO `grupos` VALUES (1,'Grupo Matemáticas','Periodo 2026','A'),(2,'Grupo Castellano','Periodo 2026','A'),(3,'Grupo Curso prueba','Periodo 2026','A'),(4,'Grupo Matematica prueba','Periodo 2026','A'),(5,'Grupo Curso final','Periodo 2026','A'),(6,'Grupo Curso CRUD','Periodo 2026','A'),(7,'Primer semestre 131602','2026 S1','A'),(8,'Grupo Role 131630','2026 S1','B');
/*!40000 ALTER TABLE `grupos` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `materias` WRITE;
/*!40000 ALTER TABLE `materias` DISABLE KEYS */;
INSERT INTO `materias` VALUES (1,'Matemáticas',NULL),(2,'Castellano',NULL),(3,'Curso prueba',NULL),(4,'Matematica prueba',NULL),(5,'Curso final',NULL),(6,'Curso CRUD','Curso creado desde prueba'),(7,'Matematica 131602','Materia prueba'),(8,'Materia Role 131630',NULL);
/*!40000 ALTER TABLE `materias` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `notas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estudiante_id` int DEFAULT NULL,
  `curso_id` int DEFAULT NULL,
  `nota` decimal(5,2) DEFAULT NULL,
  `grupo_id` int DEFAULT NULL,
  `materia_id` int DEFAULT NULL,
  `profesor_id` int DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `observacion` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  KEY `estudiante_id` (`estudiante_id`),
  KEY `curso_id` (`curso_id`),
  CONSTRAINT `notas_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`),
  CONSTRAINT `notas_ibfk_2` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `notas` WRITE;
/*!40000 ALTER TABLE `notas` DISABLE KEYS */;
INSERT INTO `notas` VALUES (1,3,4,4.50,4,NULL,NULL,'2026-05-07',NULL),(2,4,5,4.00,5,NULL,NULL,'2026-05-07',NULL),(3,6,6,4.20,6,NULL,NULL,'2026-05-07',NULL),(4,5,1,12.00,1,NULL,NULL,'2026-05-07',NULL),(5,7,NULL,4.60,7,7,NULL,'2026-05-07','Bien'),(6,8,NULL,3.90,8,8,13,'2026-05-07','Profesor OK');
/*!40000 ALTER TABLE `notas` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `profesor_materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesor_materias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `profesor_id` int NOT NULL,
  `grupo_id` int NOT NULL,
  `materia_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_profesor_grupo_materia` (`profesor_id`,`grupo_id`,`materia_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `profesor_materias` WRITE;
/*!40000 ALTER TABLE `profesor_materias` DISABLE KEYS */;
INSERT INTO `profesor_materias` VALUES (1,11,7,7),(2,13,8,8),(3,16,9,9);
/*!40000 ALTER TABLE `profesor_materias` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(3,'estudiante'),(2,'profesor'),(5,'user'),(4,'usuario');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `rol` varchar(50) COLLATE utf8mb4_general_ci DEFAULT 'usuario',
  `dni` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `rol_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `dni` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (2,'Administrador','admin@gestuedu.com','$2b$10$vGaT.lmVxCPAwvp0yNH6X.vXIXov8wgOQJL4x2kdXJlAPW/3eVIe6','admin',NULL,1),(4,'Admin','admin@test.com','$2b$10$gHGTJO2lIKHS6zzDXhtTqO1cuHxOr/SpoeQtV3VUCbQWcgQQiwrj6','usuario',NULL,4),(5,'Usuario Prueba','test122515@gestuedu.test','$2b$10$DZx6IITcu7A9sJxnayStT.bquGSbGl314WX.czq8Pr9rTGRg8z9f2','user',NULL,5),(6,'Nota User','testnota122528@gestuedu.test','$2b$10$pK8cg91zqejZC22Ati05xe47U/wH2B/nqYlk4.GABxV4SNSMy9cQK','user',NULL,5),(7,'Final User','final122638@gestuedu.test','$2b$10$kwsEcrwOTvMsOsEr8NstzuqCRR1P.8GfRnB2cLULsFNxXNko.rMtm','user',NULL,5),(8,'Usuario Modulos','modulos123940@gestuedu.test','$2b$10$MVbDgta30RzjGkI/qqgj7OHqduSdn964vsbCm4RFe6vfazPVg5e6O','user',NULL,5),(9,'Usuario Extra','extra123940@test.com','$2b$10$NzMMsSVfyvc/UmGFDy5ypuS9cYuJHbg4ix4tn16XAQQaK3O9KTWSa','usuario',NULL,4),(10,'Admin Flow','adminflow131602@test.com','$2b$10$1VqedZ9tq1Z4kBJrDfcbf.E.brwMCW5EUryzceQzYmKr4Ei5NF9T2','admin','A131602',NULL),(11,'Profesor Flow','prof131602@test.com','$2b$10$JYNWh8RxCM.2ZlcffjZFYe04aM4/JNnwcEDEUsdwPckNZkTZuL2Wq','profesor','P131602',NULL),(12,'Admin Role','adminrole131630@test.com','$2b$10$F4IYpnsdN0fKIcAsREJSheEh/l5iFDuwwfizY5bk69U4JbSAnPVGm','admin','AR131630',NULL),(13,'Profesor Role','profrole131630@test.com','$2b$10$7a3wbwcEXVvMkzCbUU.c0.jZylaoIqrnHPBCdWD3.aQBKuImFE.Ky','profesor','PR131630',NULL),(14,'Student Role User','studentrole131630@test.com','$2b$10$iIKLvn73KqBJDhonYKCITOvXP7uqO3QH27qCP07HYjAISMaz7T.sq','estudiante','SR131630',NULL),(15,'Check Admin','checkadmin132223@test.com','$2b$10$HfJE8dFv9IipdG8Rvz9Mlu2.EBtpl.qObs.d1qensFhWWfd90gVqm','admin','CA132223',NULL),(17,'Env Check','envcheck132455@test.com','$2b$10$01f1FnODa0k8YhC46ITMIOV27ZrtQgsJdaiXOvKvT/zOVUR52nF/K','admin','ENV132455',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;