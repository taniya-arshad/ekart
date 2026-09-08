package com.example.ekart.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.CodeSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger =
            LoggerFactory.getLogger(LoggingAspect.class);

    @Around(
            "execution(* com.example.ekart.controller..*(..)) || " +
                    "execution(* com.example.ekart.service..*(..)) || " +
                    "execution(* com.example.ekart.repository..*(..))"
    )
    public Object logMethodExecution(
            ProceedingJoinPoint joinPoint) throws Throwable {

        String className =
                joinPoint.getSignature()
                        .getDeclaringType()
                        .getSimpleName();

        String methodName =
                joinPoint.getSignature()
                        .getName();

        Object[] arguments =
                joinPoint.getArgs();

        String[] parameterNames =
                ((CodeSignature) joinPoint.getSignature())
                        .getParameterNames();

        logger.info(
                "Entering {}.{}()",
                className,
                methodName
        );

        if (arguments.length == 0) {

            logger.info(
                    "Input parameters: none"
            );

        } else {

            logger.info(
                    "Input parameters: {}",
                    getMaskedParameters(
                            parameterNames,
                            arguments
                    )
            );
        }

        try {

            Object result =
                    joinPoint.proceed();

            logger.info(
                    "Leaving {}.{}()",
                    className,
                    methodName
            );

            return result;

        } catch (Exception e) {

            logger.error(
                    "Exception in {}.{}(): {}",
                    className,
                    methodName,
                    e.getMessage()
            );

            throw e;
        }
    }

    private String getMaskedParameters(
            String[] parameterNames,
            Object[] arguments) {

        StringBuilder parameters =
                new StringBuilder("[");

        for (int i = 0; i < arguments.length; i++) {

            if (i > 0) {
                parameters.append(", ");
            }

            String parameterName =
                    parameterNames != null
                            && i < parameterNames.length
                            ? parameterNames[i]
                            : "";

            if (isSensitiveParameter(parameterName)) {

                parameters.append("******");

            } else {

                parameters.append(
                        maskObjectFields(arguments[i])
                );
            }
        }

        parameters.append("]");

        return parameters.toString();
    }

    private String maskObjectFields(Object object) {

        if (object == null) {
            return "null";
        }

        Class<?> objectClass =
                object.getClass();

        if (isSimpleType(objectClass)) {
            return String.valueOf(object);
        }

        StringBuilder result =
                new StringBuilder(
                        objectClass.getSimpleName()
                );

        result.append("(");

        Field[] fields =
                objectClass.getDeclaredFields();

        for (int i = 0; i < fields.length; i++) {

            if (i > 0) {
                result.append(", ");
            }

            Field field =
                    fields[i];

            field.setAccessible(true);

            result.append(field.getName());
            result.append("=");

            if (isSensitiveParameter(field.getName())) {

                result.append("******");

            } else {

                try {

                    Object value =
                            field.get(object);

                    result.append(value);

                } catch (IllegalAccessException e) {

                    result.append("******");
                }
            }
        }

        result.append(")");

        return result.toString();
    }

    private boolean isSensitiveParameter(
            String parameterName) {

        if (parameterName == null) {
            return false;
        }

        String name =
                parameterName.toLowerCase();

        return name.contains("password")
                || name.contains("token")
                || name.contains("authorization")
                || name.contains("jwt");
    }

    private boolean isSimpleType(
            Class<?> type) {

        return type.isPrimitive()
                || type == String.class
                || Number.class.isAssignableFrom(type)
                || Boolean.class == type
                || Character.class == type
                || type.isEnum();
    }
}