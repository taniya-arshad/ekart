package com.example.ekart.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

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
                    arguments
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
}